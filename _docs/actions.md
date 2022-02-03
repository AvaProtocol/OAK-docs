---
title: Actions
subtitle: A guide to OAK's actions
author: ryan
tags: [develop]
---
At this point in time OAK only supports the following actions:

- Native event
- Native token transfer
- KSM/DOT transfer (*Coming soon*)
- Parachain token transfer (*Coming soon*)

These actions are based on inital conversations with potential partners. If you have suggestions for other potential triggers which have a strong value proposition to a project you're involved with, please reach out in our #parternships [Discord](https://discord.gg/7W9UDvsbwh) channel.

## Native Event
Our native event action allows a user to schedule an event with custom text to fire on-chain. In order to use this action you will need to provide custom text. While this action was created as an mvp it could be used to trigger other actions in OAK.

## Native Token Transfer
Our native token transfer action allows you to transfer your token to another user. In order to use this action you will need to provide the user’s account id and the amount you wish to transfer. 

** An important note: We will NOT check that your account has the required balance when scheduling this action. We will only check your account balance when the action is being executed.

## KSM/DOT Transfer (*Coming soon*)
Our KSM/DOT transfer action would work almost the same as the native token transfer action. The difference being that it sends KSM/DOT instead of our native token.

## Parachain Token Transfer (*Coming soon*)
Our parachain token transfer action would work almost the same as the native token transfer action. The difference being that you would need to define the token you want to transfer.
