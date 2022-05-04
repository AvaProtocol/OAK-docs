---
title: JS SDK - Time Triggers
subtitle: The API specifications for Time Triggers
author: justin
tags: [api, time, triggers, js, sdk]
---

This is the documentation for the Javascript SDK for the Time Trigger blockchain APIs. You can find the SDK [here](https://github.com/OAK-Foundation/OAK-JS-SDK).


## SDK docs

### Schedule Tasks
You can schedule Notify and Native Transfer tasks with the SDK. Timestamps are an array, which you can either provide on your own or generate with the Recurrer object in the JS SDK, outlined below.

The Scheduler class creates a scheduler object that will help perform all scheduling tasks. The constructor takes a chain parameter, which can be either `NEU` or `TUR` at the moment. 

This class has 3 types of functions:
1. Scheduling functions to help schedule and cancel Notify and Native Transfer Tasks.
2. API helper functions to send extrinsics and 
3. Validation functions to validate and convert inputs to the scheduling functions.

The constructor takes the input to create an API client to connect to the blockchain. Further commands are performed via this API client in order to reach the blockchain. The class must be instantiated in order to invoke other functionality on it.

```javascript
const scheduler = new Scheduler(oakConstants.OakChains.NEU)
await scheduler.buildScheduleNotifyExtrinsic(...)
```

#### Building Schedule Notify Extrinsic
Scheduler.buildScheduleNotifyExtrinsic builds and signs a schedule notify task extrinsic. The function gets the next available nonce for user. Therefore, the user will need to wait for transaction finalization before sending another. Timestamps is an array of 1-24 unix timestamps, depending on recurrences needed. Also, providedID needs to be a unique ID per wallet address. We would recommend UUID generation for it.

NOTE: timestamps are converted into seconds if in milliseconds. 

We also have validation on the parameters. The requirements are as follows:
  1. on the hour
  2. in a future time slot, but within a chain-dependent scheduling limit.
  3. limited to 24 time slots at most
Scheduler.buildScheduleNotifyExtrinsic already performs these validations, but if the user wants to use the polkadot API directly, the user can also invoke this functions through Scheduler.validateTimestamps.

The output of this function is an extrinsic hex string, so it will need to be decoded before being able to be sent. The Scheduler.sendExtrinsic function can do so.

```javascript
const scheduler = new Scheduler(oakConstants.OakChains.NEU)
const extrinsicHex = await scheduler.buildScheduleNotifyExtrinsic(
  senderAddress,
  providedID,
  timestamps,
  message,
  injector.signer
)
```

#### Building Schedule Native Transfer Extrinsic
Scheduler.buildScheduleNativeTransferExtrinsic builds and signs the native transfer task extrinsic. Function gets the next available nonce for each wallet. Therefore, will need to wait for transaction finalization before sending another. Timestamps is an array of 1-24 unix timestamps, depending on recurrences needed. Also, providedID needs to be a unique ID per wallet address. We would recommend UUID generation for it.

NOTE: timestamps are converted into seconds if in milliseconds.

We also have validation on the parameters. The requirements are as follows:
  1. on the hour
  2. in a future time slot, but within a chain-dependent scheduling limit.
  3. limited to 24 time slots at most
  4. Must send a baseline amount of 1_000_000_000 plancks (0.1 NEU/TUR).
  5. The receiving address must not be the same as that of the sender.
Scheduler.buildScheduleNativeTransferExtrinsic already performs these validations, but if the user wants to use the polkadot API directly, the user can also invoke these functions through Scheduler.validateTimestamps and Scheduler.validateTransferParams.

The output of this function is an extrinsic hex string, so it will need to be decoded before being able to be sent. The Scheduler.sendExtrinsic function can do so.
```javascript
const scheduler = new Scheduler(oakConstants.OakChains.NEU)
const amount = 1000000000
const extrinsicHex = await scheduler.buildScheduleNativeTransferExtrinsic(
  senderAddress,
  providedID,
  timestamps,
  receiverAddress,
  amount,
  injector.signer
)
```

#### Cancelling a Task
Scheduler.buildCancelTaskExtrinsic builds extrinsic as a hex string for cancelling a task. The user must provide the transaction hash for the task and the wallet address used to schedule the task. This function is also building an extrinsic, so similarly to the previous two functions, this will also output a hex string, which will need to be converted back into an extrinsic before being sent.

If the transaction hash was not saved for the user, it can be retreived through Scheduler.getTaskID, which will return the transaction hash for a task given the wallet address and a provided ID. 

```javascript
const scheduler = new Scheduler(oakConstants.OakChains.NEU)
// txHash should look like `0x{string}`
const txHash = await scheduler.getTaskID(address, taskHash)
const extrinsicHex = await scheduler.buildCancelTaskExtrinsic(
  account,
  txHash,
  injector.signer
)
```

#### Sending an Extrinsic
Scheduler.sendExtrinsic sends built and signed extrinsic to the chain. This function accepts pre-built extrinsic hex string. You may provide your own error handler. If none provided, a default error handler is provided, but a custom error handler is recommended. The default error handler that logs the transaction status as well as any errors, but it does not have any level of persistence or storage to validate in the future that a specific transaction was finalized. 

A transaction hash should be returned as a result of sending the extrinsic.

```javascript
const customerErrorHandler = (result) => {...}
const scheduler = new Scheduler(oakConstants.OakChains.NEU)
const txHash = await scheduler.getTaskID(address, providedID)
const extrinsicHex = await scheduler.buildCancelTaskExtrinsic(
  account,
  txHash,
  injector.signer
)

await scheduler.sendExtrinsic(extrinsicHex, customErrorHandler)
```

#### Errors
```javascript
enum Error {
    `Recurring Task length cannot exceed 24`,
    'Scheduled timestamp in the past',
    'Scheduled timestamp in the past',
    'Timestamp too far in future',
    `Amount too low`,
    `Cannot send to self`,
}
```

### Create Recurring Timestamps
This API allows you to cancel a scheduled task. In order to do this you must have created the task and have the `task_id`.

Recurring timestamps is a feature that allows for users to schedule regularly recurring tasks with a single blockchain extrinsic, rather than through multiple extrinsic calls, as evidenced by the array of timestamps accepted in the Scheduler class. This is currently only limited to 24 instances. These timestamps do not have to be evenly spaced. It can be any timestamps in the future, on the hour, and limited to up to 24 occurrences per extrinsic call. 

This utility class will help generate timestamps on more regular cadences:
  - Hourly
  - Daily
  - Weekly
  - Monthly by Date
  - Monthly by Week of Month and Day of Week

#### Hourly Recurring Tasks
Recurrer.getHourlyRecurringTimestamps finds hourly recurring timestamps. The input for the starting timestamp is a unix timestamp in milliseconds represented as a number. The output will be an array of up to 24 hourly recurring timestamps in milliseconds. The function will find the first hour timestamp that occurs after the start timestamp. In other words, if the inputted startTimestamp is not on the hour, the first timestamp of the output will be rounded to the next hour.

For example, if the start timestamp represents 1/1/2022 at 11:01:00 UTC, the first instance of the returned output will be 1/1/2022 12:00:00 UTC.

```javascript
const recurrer = new Recurrer()
const recurrences = 5
// output is a 5-item array of unix timestamps
const timestamps = recurrer.getHourlyRecurringTimestamps(Date.now(), recurrences)
const hex = await scheduler.buildScheduleNotifyExtrinsic(
  account,
  providedID,
  timestamps,
  message,
  injector.signer
)
```

#### Daily Recurring Tasks
Recurrer.getDailyRecurringTimestamps finds daily recurring timestamps. The input for the starting timestamp is a unix timestamp in milliseconds represented as a number, along with desired hour of day. Hour of day is represented by an integer between 0 and 23 and will be interpreted in UTC time. The output will be an array of up to 24 hourly recurring timestamps in milliseconds. The function will find the first timestamp that matches the hour of day in UTC that occurs after the start timestamp.

For example, if the start timestamp represents 5/1/2022 at 23:00:00 UTC, but inputs an hourOfDay parameter of 12, which would represent 12:00:00 UTC, then the first instance of the returned output will translate to the timestamp of 5/2/2022 at 12:00:00 UTC.

```javascript
const recurrer = new Recurrer()
const recurrences = 5
const hourOfDay = 12 // noon UTC
// timestamps output is a 5-item array of unix timestamps
const timestamps = recurrer.getDailyRecurringTimestamps(
  Date.now(),
  recurrences,
  hourOfDay
)
const hex = await scheduler.buildScheduleNotifyExtrinsic(
  account,
  providedID,
  timestamps,
  message,
  injector.signer
)
```

#### Weekly Recurring Tasks
Recurrer.getWeeklyRecurringTimestamps finds weekly recurring timestamps. The input for the starting timestamp is a unix timestamp in milliseconds represented as a number, along with desired hour of day and day of week. Hour of day is represented by an integer between 0 and 23 and will be interpreted in UTC time. Day of week is represented by an integer between 0 and 6, with 0 representing Sunday. The output will be an array of up to 24 hourly recurring timestamps in milliseconds. The function will find the first timestamp that matches the hour of day and day of week in UTC that occurs after the start timestamp.

For example, if the start timestamp represents 5/1/2022 at 23:00:00 UTC, which is a Sunday, but inputs an hourOfDay parameter of 12 and a dayOfWeek parameter of 0, which would represent 12:00:00 UTC on a Sunday, then the first instance of the returned output will translate to the timestamp of 5/8/2022 at 12:00:00 UTC.

```javascript
const recurrer = new Recurrer()
const recurrences = 5
const hourOfDay = 12 // noon UTC
const dayOfWeek = 0 // Sunday
// timestamps output is a 5-item array of unix timestamps
const timestamps = recurrer.getWeeklyRecurringTimestamps(
  Date.now(),
  recurrences,
  hourOfDay,
  dayOfWeek
)
const hex = await scheduler.buildScheduleNotifyExtrinsic(
  account,
  providedID,
  timestamps,
  message,
  injector.signer
)
```

#### Monthly Recurring Tasks By Date
Recurrer.getMonthlyRecurringTimestampsByDate finds monthly recurring timestamps. The input for the starting timestamp is a unix timestamp in milliseconds represented as a number, along with desired hour of day and date of month. Hour of day is represented by an integer between 0 and 23 and will be interpreted in UTC time. Date of month is represented by an integer between 1 and 31. However, note that if the 31st is selected, months that do not have a 31st day will result in the selection of a day in the following month. Therefore, 31st of April would mean 5/1, 31st of Feburary on a leap year is 3/2 and 31st of Feburary on a non-leap year is 3/3. The output will be an array of up to 24 hourly recurring timestamps in milliseconds. The function will find the first timestamp that matches the hour of day and date of month in UTC that occurs after the start timestamp. 

In an example, if the start timestamp represents 5/1/2022 at 23:00:00 UTC, but inputs an hourOfDay parameter of 12 and a dateOfMonth parameter of 1, which would represent 12:00:00 UTC on the first day of the month, then the first instance of the returned output will translate to the timestamp of 6/1/2022 at 12:00:00 UTC.

Note that this function will produce as many timestamps as you ask it to, but the scheduler will only accept tasks 6 months in advance for Turing and 7 days in advance for Neumann. Therefore, 6 months in advance would mean at most 6 monthly recurring tasks.

```javascript
const recurrer = new Recurrer()
const recurrences = 5
const hourOfDay = 12 // noon UTC
const dateOfMonth = 1 // first day of month
// timestamps output is a 5-item array of unix timestamps
const timestamps = recurrer.getMonthlyRecurringTimestampsByDate(
  Date.now(),
  recurrences,
  hourOfDay,
  dateOfMonth
)
const hex = await scheduler.buildScheduleNotifyExtrinsic(
  account,
  providedID,
  timestamps,
  message,
  injector.signer
)
```

#### Monthly Recurring Tasks By Weekday
Recurrer.getMonthlyRecurringTimestampsByWeekday finds monthly recurring timestamps. The input for the starting timestamp is a unix timestamp in milliseconds represented as a number, along with desired hour of day, day of week and week of month. Hour of day is represented by an integer between 0 and 23 and will be interpreted in UTC time. Date of month is represented by an integer between 1 and 31. Week of month is represented by an integer between 1 and 4. However, note that only the first 4 weeks of a month are safe to schedule, since not all months have a 5th week and no month has a full 5th week. The function will find the first timestamp that matches the hour of day, day of week and week of month in UTC that occurs after the start timestamp. 

For example, if the start timestamp represents 5/1/2022 at 23:00:00 UTC, which is a Sunday, but inputs an hourOfDay parameter of 12, a dayOfWeek of 0 and a weekOfMonth of 1, which would represent 12:00:00 UTC on the first Sunday of the month. This would either refer to 12:00:00 UTC on 5/1/2022 for May, or 12:00:00 UTC on 6/5/2022 for June. However, since 12:00:00 UTC on 5/1/2022 is prior to the start timestamp, the first instance of the returned output will translate to the timestamp of 6/5/2022 at 12:00:00 UTC.

Note that this function will produce as many timestamps as you ask it to, but the scheduler will only accept tasks 6 months in advance for Turing and 7 days in advance for Neumann. Therefore, 6 months in advance would mean at most 6 monthly recurring tasks.

```javascript
const recurrer = new Recurrer()
const recurrences = 5
const hourOfDay = 12 // noon UTC
const dayOfWeek = 0 // Sunday
const weekOfMonth = 1 // first week of month
// timestamps output is a 5-item array of unix timestamps
const timestamps = recurrer.getMonthlyRecurringTimestampsByWeekday(
  Date.now(),
  recurrences,
  hourOfDay,
  dayOfWeek,
  weekOfMonth
)
const hex = await scheduler.buildScheduleNotifyExtrinsic(
  account,
  providedID,
  timestamps,
  message,
  injector.signer
)
```

### Observe Chainstate
You can also use the SDK to observer the chain state. The Observer class creates a observer object that will help perform all scheduling tasks. The constructor takes a chain parameter, which can be either `NEU` or `TUR` at the moment.

The Observer class is for checking the state of the chain.
Currently, this will give visibility into:
  - Last Time Slot
  - Missed Task Queue
  - Task Queue
  - Scheduled Task Map
  - Task Map

The constructor takes the input to create an API client to connect to the blockchain.
Further commands are performed via this API client in order to reach the blockchain.

#### Last Time Slot
Observer.getAutomationTimeLastTimeSlot gets Last Time Slots for AutomationTime pallet on chain. It will return a tuple of numbers (number, number) as a Javascript array. The first number represents the last time slot where tasks were executed. The second number represents the last time slot where missed tasks were handled. 

```javascript
const observer = new Observer(oakConstants.OakChains.NEU)
const lastTimeSlot = await observer.getAutomationTimeLastTimeSlot()
```

#### Missed Task Queue
Observer.getAutomationTimeMissedQueue gets Task hashes in the Missed Queue. The Missed Queue holds tasks that were not able to be run during their scheduled time slot and will no longer run. Tasks on the missed queue will be processed and an event will be emitted, marking completion of the task. This function returns an array of missed task objects: 
```javascript
interface MissedTask {
  task_id: 0xstring,
  execution_time: number
}
```

```javascript
const observer = new Observer(oakConstants.OakChains.NEU)
const missedQueueTasks = await observer.getAutomationTimeMissedQueue()
```

#### Task Queue
Observer.getAutomationTimeTaskQueue gets Task hashes in the Task Queue. These represent tasks that will be run in the current time slot. 

```javascript
const observer = new Observer(oakConstants.OakChains.NEU)
const taskQueueTaskHashes = await observer.getAutomationTimeTaskQueue()
```

#### Scheduled Task Map
Observer.getAutomationTimeScheduledTasks gets list of Task hashes for a given future time slot. These are the hashes for tasks scheduled in future time slots, which are defined by start of each hour. A valid future time slot must be input in order to get the tasks for that slot.

```javascript
const observer = new Observer(oakConstants.OakChains.NEU)
const timeSlot = 1651636800 // translates to Wed May 04 2022 04:00:00 GMT+0000
const scheduledTasks = await observer.getAutomationTimeScheduledTasks(timeSlot)
```

#### Task Map
Observer.getAutomationTimeTasks gets an Automation Task given a task ID. This will have all data and metadata regarding each task. A task ID hash must be input into this function in order to retreive the corresponding task.
```javascript
interface AutomationTask {
  ownerId: string
  providedId: `0x${string}`
  execution_times: number[],
  executions_left: number,
  action: AutomationTaskNotifyAction | AutomationTaskTransferAction
}
```

```javascript
const observer = new Observer(oakConstants.OakChains.NEU)
// can get this txHash with Scheduler.getTaskID if not already saved
const txHash = "0xf43a77d7262e2fcdee1756f1796d4db7f4fc24183096533c9a8e826a3c29a551"
const scheduledTasks = await observer.getAutomationTimeTasks(txHash)
```

## Example
This will be an example of how we create an hourly recurring call for 24 hours.

We recommend that you create the extrinsic on the frontend and sign and send in the backend. The frontend provides easy access to the polkadot.js extension, which lets you sign the extrinsic without needing to store user-sensitive data.

Meanwhile, on the backend, you can easily handle new websocket statuses and store errors as needed.

### Frontend
On the frontend, you can call the Recurrer class to create a set of valid timestamps and use the Scheduler class to create the extrinsic as a hex string and validate all of the extrinsic parameters. It's recommended that you don't necessarily send the extrinsic in the frontend, since sending the extrinsic opens up a websocket, for which you will not be able to record any of the results.

NOTE: the below is just an example, but we do not recommend creating new instances of the Scheduler, Recurrer, etc classes on each invocation. It's probably best to start your service with the classes instantiated and then utilize those classes as needed on an ongoing basis.

```javascript
/* In the example below, we are scheduling a single notification task
 * that recurs 24 times on an hourly basis.
 */
async function NEUNotify(senderAddress) {
  await web3Enable('neumann-demo')
  const injector = await web3FromAddress(senderAddress);
  const scheduler = new Scheduler(oakConstants.OakChains.NEU)
  const recurrer = new Recurrer()
  const recurrences = 24
  const timestamps = recurrer.getHourlyRecurringTimestamps(Date.now(), recurrences)
  // Recommended to save this providedID to retreive task in the future
  const providedID = uuid.v4()
  const hex = await scheduler.buildScheduleNotifyExtrinsic(
    senderAddress,
    providedID,
    timestamps,
    receiverAddress,
    injector.signer
  )
  return hex
}
```

### Backend
On the backend, you can use the Scheduler.sendExtrinsic() call to decode the hex string and send the extrinsic. Below would be an example of some code written in an API route that receives the extrinsic hexstring.

NOTE: You don't have to put in a custom error handler, but it is recommended. There is a default error handler that logs the transaction status as well as any errors, but it does not have any level of persistence or storage to validate in the future that a specific transaction was finalized. 

```javascript
const customErrorHandler = (result) => {...}
const backendScheduler = new Scheduler(oakConstants.OakChains.NEU)
const txHash = await backendScheduler.sendExtrinsic(hex, customErrorHandler)
```
