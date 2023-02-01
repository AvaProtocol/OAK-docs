---
title: Proxy collating permissions
subtitle: Allow wallets to run collators on your behalf
author: andrew
tags: [infra, collator]
date: 2022-07-22
---

## Account Proxies

Turing allows users to delegate access to a limited number of actions to other users.  This can be useful in two scenarios while collating.

## Use a collating service

Assigned collators might prefer to allow an experienced service provider to run a collator on their behalf.  However, sharing a wallet's private key is a bad practice and can be dangerous when the wallet contains significant funds.  The `Session` proxy type allows a wallet that has joined to the collator candidate pool to delegate session key rotation to another wallet without granting access to underlying funds.

### Step 1: Prepare to delegate

Acquire both wallet addresses and be prepared to sign an extrinsic as the account that has joined the candidate pool.

### Step 2: Delegate permission

Use the Polkadot JS wallet app to execute the extrinsic to delegate permissions.

1. [Access the wallet app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech)
2. Click "Developer", then "Extrinsics" in the navigation bar
3. In the "submit the following extrinsic" drop down pair
    * Select "proxy" from the first drop down
    * Select "addProxy(delegate, proxyType, delay)" from the second drop down
4. Provide appropriate paramaters for the method arguments
    * delegate: The account owned by the service provider that will begin collating
    * proxyType: Session
    * delay: Count in blocks before this proxy is valid
5. Submit and sign the extrinsic.

Once the permission has been delegated, the second account can be used to execute session extrinsics using the `proxy.proxy` extrinsic.  See the [collator documentation](../collators/#how-to-register-as-a-collator) for information on acquiring and setting session keys.

## Advanced collating delegation

Collating wallets can also delegate complete permissions to staking using the `Staking` proxy type.  This proxy type provides access to all actions in the `Session` proxy type. It also includes more advanced actions found under `parachainStaking`.  This includes the ability to leave the collator candidate pool which is a destructive action and delegating these permissions should be done with caution.
