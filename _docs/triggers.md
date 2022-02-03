---
title: Triggers
subtitle: A guide to OAK's triggers
author: ryan
tags: [develop]
---

At this point in time OAK only supports the following triggers:

- Time
- Token price (*Coming soon*)
- XCMP event (*Coming soon*)
- On-chain event (*Coming soon*)

These triggers are based on inital conversations with potential partners. If you have suggestions for other potential triggers which have a strong value proposition to a project you're involved with, please reach out in our #parternships [Discord](https://discord.gg/7W9UDvsbwh) channel.

## Time
Our time trigger allows you to schedule an action to occur during a specific minute. To clarify we will ensure your action is executed within the requested minute but cannot guarantee when in that minute it will execute. In order to use this trigger you will need to provide a timestamp that is at least one minute in the future.

We are looking at adding the following features to the time trigger.

- Support scheduling for an hour
- Support scheduling for a day
- Support scheduling recurring actions

## Token Price (*Coming soon*)
Our token price trigger allows you to schedule an action based on the price of a token. You will be able to select from a range of tokens, and state the condition you care are about. For example, you could trigger when the price of DOT is >= __. In case you are wondering why there is a `__`, it is because we are still debating what we will support you to compare against.

## XCMP Event (*Coming soon*)
Our XCMP event trigger allows you to schedule an action when an XCMP event is received. We are thinking about two different version of this trigger. First, you could register this event and the data with OAK. This would allow other users to create triggers based on the data inside this event. Second, you could simply create a trigger that fires when this event is received by OAK.

## On-chain Event (*Coming soon*)
Our on-chain event would work almost the same as the XCMP event trigger.