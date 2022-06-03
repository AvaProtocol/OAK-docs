---
title: Setup an on-chain identity
subtitle: This document covers the steps of setting up on-chain identity for your account
author: charles
tags: [identity, registrar]
---

## How to setup your on-chain identity

### Step 1: Navigate to your accounts page on PolkadotJS

On [PolkadotJS App](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/) page, select the “Accounts” tab and select “Set on-chain identity” with your account as shown below.

![set-on-chain-identity](../../assets/img/identity/set-on-chain-identity.png)

### Step 2: Select the account you want to set an identity for and fill in the inputs

Make sure your account has at least 10 TUR (Total Deposit shown in the UI), enter your identity information and click the “Set Identity” button.

![register-identity](../../assets/img/identity/register-identity.png)

### Step 3: Validate that your information is correct after saving your identity

After the extrinsic is confirmed, there will be a gray minus sign to the left of the account name, indicating that the account has been registered but has not yet passed the judegement.

![no-judgements](../../assets/img/identity/no-judgements.png)

### Step 4: Contact a registrar to acquire the judgement

You can either contact the registrar via their on-chain information or you can ask the registrar to review your request in [OAK Discord room](https://discord.gg/7W9UDvsbwh).

### Step 5: Registrar makes a judgement

When a registrar provides judgement, they can select up to six levels of confidence in their attestation:

| Confidence Level | Description                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------- |
| Unknown          | The default value, no judgement made yet.                                                     |
| Reasonable       | The data appears reasonable, but no in-depth checks (e.g. formal KYC process) were performed. |
| Known Good       | The registrar has certified that the information is correct.                                  |
| Out of Date      | The information used to be good, but is now out of date.                                      |
| Low Quality      | The information is low quality or imprecise, but can be fixed with an update.                 |
| Erroneous        | The information is erroneous and may indicate malicious intent.                               |

### Step 6: Check your identity

After the identity is approved, you can see a green symbol on the left side of the your address, indicating that the identity verification is approved.

![success](../../assets/img/identity/success.png)

## FAQ

### Why do I need to set an identity on-chain?

There are a number of reasons to set an on-chain identity or remain anonymous. For the following users and token holders, we recommend setting an on-chain identity to make participation more seamless and efficient.

- Participants of governance (council members, committee members, motion passers, etc.)
- Collators seeking delegators to stake on their behalf
- Community members seeking to be registrars

### Who approves someone's identity?

[Registrars](https://turing.subscan.io/account?role=registrar). At first, registrars are set via Sudo, and are OAK team members or ambassadors. Once governance is enabled, any community member can become registrars via democracy.

There is no KYC/AML process to set an on-chain identity. However, if there is very clearly spam or misuse, it might be difficult for a registrar to understand intent behind setting on-chain identity.
