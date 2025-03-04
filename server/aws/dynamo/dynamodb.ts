import { GetCommand, PutCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

import { docClient } from "@/aws/dynamo/dynamodb.config";
import { SubTask, Task } from "@/globals/types/Task.type";
import { TableNames } from "@/globals/constants";

export const addTask = async (task: Task): Promise<void> => {
  console.log(task);
  const params = {
    TableName: TableNames.Tasks,
    Item: task,
  };

  await docClient.send(new PutCommand(params));
};

export const getTasksByMentor = async (mentorId: string): Promise<Task[] | undefined> => {
  const id = mentorId.toString();
  const params = {
    TableName: TableNames.Tasks,
    IndexName: "mentorId-index",
    KeyConditionExpression: "mentor_id = :mentor_id",
    ExpressionAttributeValues: {
      ":mentor_id": id,
    },
  };

  const { Items } = await docClient.send(new QueryCommand(params));
  return Items as Task[];
};

export const getTasksByMenti = async (mentiId: string) => {
  const id = mentiId.toString();
  const params = {
    TableName: TableNames.Tasks,
    IndexName: "mentiId-index",
    KeyConditionExpression: "menti_id = :menti_id",
    ExpressionAttributeValues: {
      ":menti_id": id,
    },
  };

  const { Items } = await docClient.send(new QueryCommand(params));
  return Items;
};

export const getTaskDetails = async (taskId: string) => {
  const params = {
    TableName: TableNames.Tasks,
    KeyConditionExpression: "task_id = :task_id",
    ExpressionAttributeValues: {
      ":task_id": taskId,
    },
  };

  const { Items } = await docClient.send(new QueryCommand(params));

  return Items?.[0].subtasks;
};

export const addSubtask = async (task_id: string, subtask: SubTask) => {
  const params = {
    TableName: TableNames.Tasks,
    Key: {
      task_id,
    },
    UpdateExpression: "SET subtasks = list_append(if_not_exists(subtasks, :empty), :newSubtask)",
    ExpressionAttributeValues: {
      ":empty": [],
      ":newSubtask": [subtask],
    },
  };

  await docClient.send(new UpdateCommand(params));
};

export const changeTaskStatus = async (id: string, newStatus: string) => {
  const params = {
    TableName: TableNames.Tasks,
    Key: {
      task_id: id,
    },
    UpdateExpression: "SET #status = :newStatus", // Use alias for 'status'
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":newStatus": newStatus,
    },
  };

  await docClient.send(new UpdateCommand(params));
};

export const changeSubtaskStatus = async (
  task_id: string,
  subtask_id: string,
  newStatus: string,
) => {
  // Step 1: Retrieve the task item to find the index of the subtask
  const getParams = {
    TableName: "Tasks",
    Key: { task_id },
  };

  const getResult = await docClient.send(new GetCommand(getParams));
  if (!getResult.Item) {
    throw new Error(`Task with id ${task_id} not found.`);
  }

  const subtasks = getResult.Item.subtasks;
  if (!Array.isArray(subtasks)) {
    throw new Error(`Subtasks attribute not found for task ${task_id}.`);
  }

  // Step 2: Find the index of the subtask by its id
  const index = subtasks.findIndex((subtask: SubTask) => subtask.id === subtask_id);
  if (index === -1) {
    throw new Error(`Subtask with id ${subtask_id} not found in task ${task_id}.`);
  }

  // Step 3: Update the subtask's status using its index.
  // Since "status" is a reserved word, we use an alias (#status)
  const updateParams = {
    TableName: "Tasks",
    Key: { task_id },
    UpdateExpression: `SET subtasks[${index}].#status = :newStatus`,
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":newStatus": newStatus,
    },
  };

  const updateResult = await docClient.send(new UpdateCommand(updateParams));
  console.log("Subtask status updated:", updateResult.Attributes);
  return updateResult.Attributes;
};