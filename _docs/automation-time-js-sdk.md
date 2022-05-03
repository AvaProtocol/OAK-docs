---
title: JS SDK - Time Triggers
subtitle: The API specifications for Time Triggers
author: justin
tags: [api, time, triggers, js, sdk]
---

This is the documentation for the Javascript SDK for the Time Trigger blockchain APIs. You can find the SDK here: https://github.com/OAK-Foundation/OAK-JS-SDK.


## SDK docs

### Schedule Tasks
You can schedule Notify and Native Transfer tasks with the SDK. Timestamps are an array, which you can either provide on your own or generate with the Recurrer object in the JS SDK, outlined below.


#### Scheduler Class
The Scheduler class creates a scheduler object that will help perform all scheduling tasks. The constructor takes a chain parameter, which can be either `NEU` or `TUR` at the moment.

This class has 3 types of functions:
1. Scheduling functions to help schedule and cancel Notify and Native Transfer Tasks.
2. API helper functions to send extrinsics and 
3. Validation functions to validate and convert inputs to the scheduling functions.

```javascript
/**
 * The constructor takes the input to create an API client to connect to the blockchain.
 * Further commands are performed via this API client in order to reach the blockchain.
 * @param chain: OakChains ("NEU"/"TUR")
 */
export class Scheduler {
  wsProvider: WsProvider
  api: ApiPromise
  chain: OakChains
  schedulingTimeLimit: number

  /**
   * BuildScheduleNotifyExtrinsic: builds and signs a schedule notify task extrinsic.
   * Function gets the next available nonce for user.
   * Therefore, will need to wait for transaction finalization before sending another.
   * Timestamps are converted into seconds if in milliseconds.
   * 
   * Timestamps must be:
   * 1. on the hour
   * 2. in a future time slot, but within a chain-dependent scheduling limit.
   * 3. limited to 24 time slots
   * 
   * @param address
   * @param providedID
   * @param timestamp
   * @param receivingAddress
   * @param amount
   * @returns extrinsic hex, format: `0x${string}`
   */
  async buildScheduleNotifyExtrinsic(
    address: string,
    providedID: string,
    timestamps: number[],
    message: string,
    signer: Signer
  ): Promise<HexString>

  /**
   * BuildScheduleNativeTransferExtrinsic: builds and signs native transfer task extrinsic.
   * Function gets the next available nonce for each wallet.
   * Therefore, will need to wait for transaction finalization before sending another.
   * Timestamps is an array of 1-24 unix timestamps, depending on recurrences needed.
   * ProvidedID needs to be a unique ID per wallet address.
   * Timestamps are converted into seconds if in milliseconds.
   * 
   * Timestamps must be:
   * 1. on the hour
   * 2. in a future time slot, but within a chain-dependent scheduling limit.
   * 3. limited to 24 time slots
   * 
   * Native Transfer Params:
   * 1. Must send a baseline amount of 1_000_000_000 plancks (0.1 NEU/TUR).
   * 2. The receiving address must not be the same as that of the sender.
   * 
   * @param address
   * @param providedID
   * @param timestamp
   * @param receivingAddress
   * @param amount
   * @returns extrinsic hex, format: `0x${string}`
   */
  async buildScheduleNativeTransferExtrinsic(
    address: string,
    providedID: string,
    timestamps: number[],
    receivingAddress: string,
    amount: number,
    signer: Signer
  ): Promise<HexString>

  /**
   * BuildCancelTaskExtrinsic: builds extrinsic as a hex string for cancelling a task. 
   * User must provide txHash for the task and wallet address used to schedule the task.
   * @param address
   * @param transactionHash
   * @returns extrinsic hex, format: `0x${string}`
   */
  async buildCancelTaskExtrinsic(
    address: string,
    providedID: number,
    signer: Signer
  ): Promise<HexString>
  
  /**
   * SendExtrinsic: sends built and signed extrinsic to the chain.
   * Accepts pre-built extrinsic hex string. You may provide your own error handler.
   * If none provided, a default error handler is provided, seen below.
   * A transaction hash should be returned as a result of the extrinsic.
   * @param extrinsic
   * @param handleDispatch
   * @returns transaction hash
   */
  async sendExtrinsic(
    extrinsicHex: HexString,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    handleDispatch: (result: ISubmittableResult) => any
  ): Promise<string>

  /**
   * Default error handler for websockets updates for extrinsic
   * @param result 
   * @returns null
   */
  async defaultErrorHandler(result: ISubmittableResult): Promise<void>

  /**
   * GetInclusionFees: gets the fees for inclusion ONLY.
   * This does not include execution fees.
   * @param extrinsic
   * @param address
   * @returns fee
   */

  async getInclusionFees(
    extrinsic: SubmittableExtrinsic<'promise', ISubmittableResult>,
    address: string
  ): Promise<Balance>

  /**
   * GetTaskID: gets a txHash for a task.
   * Wallet Address and Provided ID are required inputs.
   * TxHash for a task will be returned.
   * @param address
   * @param providedID
   * @returns next available task ID
   */
  async getTaskID(address: string, providedID: string)

  /**
   * validateTimestamps: validates timestamps. If not valid, will error.
   * If valid, nothing is returned. Called in buildScheduleNotifyExtrinsic
   * and buildScheduleNativeTransferExtrinsic.
   * 
   * Timestamps must be:
   * 1. on the hour
   * 2. in a future time slot, but within a chain-dependent scheduling limit.
   * 3. limited to 24 time slots
   * 
   * @param timestamps 
   */
  validateTimestamps(timestamps: number[]): void

  /**
   * validateTransferParams: validates Native Transfer params. If not valid, will error.
   * If valid, nothing is returned. Called in buildScheduleNativeTransferExtrinsic.
   * 
   * Native Transfer Params:
   * 1. Must send a baseline amount of 1_000_000_000 plancks (0.1 NEU/TUR).
   * 2. The receiving address must not be the same as that of the sender.
   * 
   * @param amount 
   * @param sendingAddress 
   * @param receivingAddress 
   */
  validateTransferParams(
    amount: number,
    sendingAddress: string,
    receivingAddress: string
  ): void
}
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

** We are still working on the RPC call to generate the task_id. Please save your `provided_id` so you can generate this later.

#### Recurrer Class
```javascript
/**
 * Recurring timestamps is a feature that allows for users to schedule regularly
 * recurring tasks with a single blockchain extrinsic, rather than through multiple
 * extrinsic calls, as evidenced by the array of timestamps accepted in the Scheduler
 * class. This is currently only limited to 24 instances. These timestamps do not
 * have to be evenly spaced. It can be any timestamps in the future, on the hour, and 
 * limited to up to 24 occurrences per extrinsic call. 
 * 
 * This utility class will help generate timestamps on more regular cadences:
 * - Hourly
 * - Daily
 * - Weekly
 * - Monthly by Date
 * - Monthly by Week of Month and Day of Week
 */
export class Recurrer {
  /**
   * getDailyRecurringTimestamps: finds up to 24 daily recurring timestamps.
   * Input any timestamp in milliseconds along with desired hour of day.
   * Function will find next available hourly timestamp based on hour of day and
   * output up to 24 daily recurring timestamps in milliseconds
   * If startTimestamp is not on the hour, the first timestamp of the output will be rounded
   * to the day with the inputted hour of day
   * @param startTimestamp
   * @param numberRecurring
   * @param hourOfDay
   * @returns daily recurring timestamps
   */
  getDailyRecurringTimestamps(startTimestamp: number, numberRecurring: number, hourOfDay: HourOfDay): number[]

  /**
   * getHourlyRecurringTimestamps: finds up to 24 hourly recurring timestamps.
   * Input starting timestamp in milliseconds.
   * Output up to 24 hourly recurring timestamps in milliseconds.
   * If startTimestamp is not on the hour, the first timestamp of the output will be rounded
   * to the next hour.
   * @param startTimestamp
   * @param numberRecurring
   * @returns hourly recurring timestamps
   */
  getHourlyRecurringTimestamps(startTimestamp: number, numberRecurring: number): number[]

  /**
   * getWeeklyRecurringTimestamps: Input starting timestamp in milliseconds
   * along with desired day of week and hour of day.
   * Output up to 24 weekly recurring timestamps in milliseconds.
   * If startTimestamp is not on the correct day of week, the function will find
   * the next available day where it is the correct day of week.
   * @param startTimestamp
   * @param numberRecurring
   * @param hourOfDay
   * @param dayOfWeek
   * @returns weekly recurring timestamps
   */
  getWeeklyRecurringTimestamps(
    startTimestamp: number,
    numberRecurring: number,
    hourOfDay: HourOfDay,
    dayOfWeek: DayOfWeek
  ): number[]

  /**
   * getMonthlyRecurringTimestampsByDate: Input starting timestamp in milliseconds 
   * along with desired date of month and hour of day.
   * Output up to 6 monthly recurring timestamps in milliseconds.
   * If startTimestamp does not fit the hourOfDay or dateOfMonth requirements,
   * the first timestamp of the output will be rounded to the next hour
   * with a valid hour of day on a valid date of the month.
   * @param startTimestamp
   * @param numberRecurring
   * @param hourOfDay
   * @param dateOfMonth
   * @returns monthly recurring timestamps
   */
  getMonthlyRecurringTimestampsByDate(
    startTimestamp: number,
    numberRecurring: number,
    hourOfDay: HourOfDay,
    dateOfMonth: DateOfMonth
  ): number[]

  /**
   * getMonthlyRecurringTimestampsByWeekday: Input starting timestamp in milliseconds
   * along with desired week of month, day of week and hour of day.
   * Output up to 6 monthly recurring timestamps in milliseconds.
   * If startTimestamp does not fit the hourOfDay, dayOfweek and weekOfMonth requirements,
   * the first timestamp of the output will be rounded to the next hour
   * with a valid hour of a valid day of week on a valid week of the month.
   * @param startTimestamp
   * @param numberRecurring
   * @param hourOfDay
   * @param dayOfWeek
   * @param weekOfMonth
   * @returns monthly recurring timestamps
   */
  getMonthlyRecurringTimestampsByWeekday(
    startTimestamp: number,
    numberRecurring: number,
    hourOfDay: HourOfDay,
    dayOfWeek: DayOfWeek,
    weekOfMonth: WeekOfMonth
  ): number[]
}
```

### Observe Chainstate
You can also use the SDK to observer the chain state.

#### Observer Class
The Observer class creates a observer object that will help perform all scheduling tasks. The constructor takes a chain parameter, which can be either `NEU` or `TUR` at the moment.

```javascript
/**
 * The Observer class is for checking the state of the chain.
 * Currently, this will give visibility into:
 * - Last Time Slot
 * - Missed Task Queue
 * - Task Queue
 * - Scheduled Task Map
 * - Task Map
 * 
 * The constructor takes the input to create an API client to connect to the blockchain.
 * Further commands are performed via this API client in order to reach the blockchain.
 * @param chain: OakChains ("NEU"/"TUR")
 */
export class Observer {
  wsProvider: WsProvider
  api: ApiPromise

  /**
   * Gets Last Time Slots for AutomationTime pallet on chain
   * @returns (number, number)
   */
  async getAutomationTimeLastTimeSlot(): Promise<number[]>

  /**
   * Gets Task hashes in Missed Queue. Missed Queue holds tasks that were not able
   * to be run during their scheduled time slot and will no longer run.
   * Tasks on the missed queue will be processed and an event will be emitted, marking
   * completion of the task.
   * @returns { task_id: 0xstring, execution_time: number }[]
   */
  async getAutomationTimeMissedQueue(): Promise<MissedTask[]>

  /**
   * Gets Task hashes in Task Queue. These are tasks that will be run in a time slot.
   * Current time slots are only in hours.
   * @returns 0xstring[]
   */
  async getAutomationTimeTaskQueue(): Promise<string[]>

  /**
   * Gets list of Task hashes for a given future time slot. These are the hashes for
   * tasks scheduled in future time slots, which are defined by start of each hour.
   * @param inputTime
   * @returns 0xstring[]
   */
  async getAutomationTimeScheduledTasks(inputTime: number): Promise<string[] | null>

  /**
   * Gets an Automation Task given a task ID. This will have all data and metadata
   * regarding each task.
   * @param taskID
   * @returns AutomationTask
   */
  async getAutomationTimeTasks(taskID: HexString): Promise<AutomationTask>
}
```

## Example
This will be an example of how we create an hourly recurring call for 24 hours.

We recommend that you create the extrinsic on the frontend and sign and send in the backend. The frontend provides easy access to the polkadot.js extension, which lets you sign the extrinsic without needing to store user-sensitive data.

Meanwhile, on the backend, you can easily handle new websocket statuses and store errors as needed.

### Frontend
On the frontend, you can call the Recurrer class to create a set of valid timestamps and use the Scheduler class to create the extrinsic as a hex string and validate all of the extrinsic parameters. It's recommended that you don't necessarily send the extrinsic in the frontend, since sending the extrinsic opens up a websocket, for which you will not be able to record any of the results.

NOTE: the below is just an example, but we do not recommend creating new instances of the Scheduler, Recurrer, etc classes on each invocation. It's probably best to start your service with the classes instantiated and then utilize those classes as needed on an ongoing basis.

```javascript
async function NEUNotify(account) {
  await web3Enable('neumann-demo');
  const injector = await web3FromAddress(account);
  const scheduler = new Scheduler(oakConstants.OakChains.NEU)
  const recurrer = new Recurrer()
  const timestamps = recurrer.getHourlyRecurringTimestamps(Date.now(), 24)
  const providedID = uuid.v4()
  const hex = await scheduler.buildScheduleNotifyExtrinsic(account, providedID, timestamps, providedID, injector.signer)
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