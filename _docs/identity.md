---
title: Set up Identity
subtitle: This document covers the steps of setting up on-chain identity for your account
author: charles
tags: [identity, registrar]
---

## Intro

**For better collaboration, we strongly suggest each developer to set up an identity on Turing Network. Here is how.**

## Set Identity

On polkadot.js apps page, select the “Accounts” tab and select “Set on-chain identity” with your account as shown below.

![set-on-chain-identity](../../assets/img/identity/set-on-chain-identity.png)

Enter your identity information and click the “Set Identity” button.

![register-identity](../../assets/img/identity/register-identity.png)

After the extrinsic is confirmed, there will be a gray minus sign to the left of the account name, indicating that the account has been registered but has not yet passed the judegement.

![no-judgements](../../assets/img/identity/no-judgements.png)

## Request Judegement

### Retrieving the List of Registrars

![registrars](../../assets/img/identity/registrars.png)

As shown above, there are currently two registrars.

The fee of the first person (6Ah9LrGFyc4AT22dYUQTuSY8vxJkegZ5F5Udqx4eVJh8AJ6T) is 0, which means that he charges 0 tokens to do a judgement.

### Request Judegement

Select “Developer” -> “Extrinsics”, and use your account to send a `identity.requestJudgement` extrinsic.

![request-judgement](../../assets/img/identity/request-judgement.png)

- regIndex: The index of registrars.
- maxFee: You need to provide a fee higher than registrar.

## Asks registrar to approve judgement

### Contact Registrar

You can ask the registrar to review your request in [OAK Discord room](https://discord.gg/7W9UDvsbwh).

### Registrar approves judgement

When a registrar provides judgement, they can select up to six levels of confidence in their attestation:

- Unknown: The default value, no judgement made yet.

- Reasonable: The data appears reasonable, but no in-depth checks (e.g. formal KYC process) were performed.

- Known Good: The registrar has certified that the information is correct.

- Out of Date: The information used to be good, but is now out of date.

- Low Quality: The information is low quality or imprecise, but can be fixed with an update.

- Erroneous: The information is erroneous and may indicate malicious intent.

## Check your indentity

After the indentity is approved, you can see a green symbol on the left side of the your address, indicating that the identity verification is approved.

![success](../../assets/img/identity/success.png)
