---
title: Earn Staking Rewards
subtitle: How to stake to a collator and earn rewards
author: charles
tags: [delegator]
---
## How to stake TUR
This guide provides links and instructions for staking by delegating an existing Turing Network collator. See [Collator Overview](https://docs.oak.tech/docs/collators/) for instructions on setting up your own collator.

_Please exercise caution when following links to external resources that are not maintained or tested by the OAK Network team!_

## Which wallet are you using?

### Option 1: staketur.com
- Use [staketur.com Dashboard](https://staketur.com/dashboard/dash-staking) to stake and delegate an existing collator from your web browser. 

### Option 2: Nova Wallet
- Nova Wallet on [Android](https://play.google.com/store/apps/details?id=io.novafoundation.nova.market) and [iOS](https://apps.apple.com/us/app/nova-polkadot-kusama-wallet/id1597119355) supports staking and delegating from your mobile device.
- Video tutorial for Nova Wallet is available in [English](https://www.youtube.com/watch?v=UhmNwO4hhRQ).

### Option 3: PolkadotJS Chrome Extension
If you are power user who is familiar with Polkadot.js/apps website, please refer to the instructions in [Delegation through Extrinsics](../delegation-dev)

### Which collator will you delegate your stake to?

[StakeTur](https://staketur.com) by StakeBaby, staking applications, and wallet interfaces with staking support will provide additional information that can help you choose who to delegate. Join the [OAK Discord Server](https://discord.gg/7W9UDvsbwh) for #collator-open-chat about delegation.

**Important disclaimer about risks**

_Holders of TUR tokens should perform careful due diligence on collators before delegating. Being listed as a collator is not an endorsement or recommendation from the Turing Network, or OAK Foundation. Neither the Turing Network, nor has OAK Foundation vetted the list collators and assumes no responsibility with regard to the selection, performance, security, accuracy, or use of any third-party offerings. You alone are responsible for doing your own diligence to understand the applicable fees and all risks present, including actively monitoring the activity of your collators._

_You agree and understand that neither the Turing Network, nor OAK Foundation guarantees that you will receive staking rewards and any applicable percentage provided (i) is an estimate only and not guaranteed, (ii) may change at any time and (iii) may be more or less than the actual staking rewards you receive. The OAK Foundation makes no representations as to the monetary value of any rewards at any time._

_Staking TUR tokens is not free of risk. Staked TUR tokens are locked up, and retrieving them requires a waiting period. Additionally, if a collator fails to perform required functions or acts in bad faith, a portion of their total stake can be slashed (i.e. destroyed). This includes the stake of their delegators. If a collators behaves suspiciously or is too often offline, delegators can choose to unbond from them or switch to another collator. Delegators can also mitigate risk by electing to distribute their stake across multiple collators._

## How to stake on Nova Wallet

1. As a prerequisite, you need to have an account in the Nova wallet and have some balance in the account.

1. Switch to the "Staking" tab, select the Turing network, and click "Start staking".

    ![staking](../../assets/img/delegation-user/nova/staking.png){:.centered width="60%"}

1. Select a collator, fill in the amount, and click the "continue" button to complete the delegation.

    ![delegate](../../assets/img/delegation-user/nova/delegate.png){:.centered width="60%"}

1. When you complete the delegation, you can check your delegation results.

    ![result](../../assets/img/delegation-user/nova/result.png){:.centered width="60%"}

1. You can turn on Turing's auto-compound feature to earn more reward.

    ![enable-compound](../../assets/img/delegation-user/nova/enable-compound.png){:.centered width="60%"}

1. Select a collator, switch to "with Yield Boost", fill in boost threshold, and click "confirm" to start auto-compound. 
   
   Note: When the wallet balance is less than the boost threshold, the auto-compound task will be cancelled.

    ![compound](../../assets/img/delegation-user/nova/compound.png){:.centered width="60%"}

    ![confirm-compound](../../assets/img/delegation-user/nova/confirm-compound.png){:.centered width="60%"}

## How to stake on staketur.com (https://staketur.com/dashboard/dash-staking)

1. As a prerequisite, you need to have an account in the polkadot.js browser extension and have some balance in the account.

1. Visit https://staketur.com/dashboard/dash-staking in your browser. Click "Connect Polkadot" and wait for a while. When the authorization window pops up, click "Yes, allow this application access".

    ![connect-polkadot](../../assets/img/delegation-user/staketur/connect-polkadot.png){:.centered width="60%"}

1. Select an account.

    ![select-account](../../assets/img/delegation-user/staketur/select-account.png){:.centered width="60%"}

1. Select a collator, fill in the amount, click the "Delegate" button, and sign transaction. After you complete the delegation, you can check the results of your delegation.

    ![delegate](../../assets/img/delegation-user/staketur/delegate.png){:.centered width="60%"}
	
    ![sign-transaction](../../assets/img/delegation-user/staketur/sign-transaction.png){:.centered width="60%"}

1. You can turn on Turing's auto-compound feature to earn more reward. 

    Note: When the wallet balance is less than a certain threshold, the auto-compound task will be cancelled.

    ![enable-compound](../../assets/img/delegation-user/staketur/enable-compound.png){:.centered width="60%"}
    
    ![sign-compound-transaction](../../assets/img/delegation-user/staketur/sign-compound-transaction.png){:.centered width="60%"}

## FAQ

### How do I check how many TUR rewards I’ve received?

Search for your wallet on the [Turing Subscan](https://turing.subscan.io/event?address=YOUR_NOMINATOR_WALLET&module=parachainstaking&event=reward) and filter for "reward" events.

### What rewards will I get?

The Turing Network pays 2.5% in annual token inflation to the stakers who back the collators which successfully author blocks. Those rewards are distributed proportionally among the stakers for each collator, including the self-bond of the node operator and up to 300 delegators.

Each block pays the same amount in rewards, so your portion of rewards for authoring each block will be lower when delegating to a collator with a higher total stake (self-bond plus delegated stake) when compared to a collator with a lower total stake.

For simulation of Staking rate of return, please check out [Web3go Turing Staking](https://app.web3go.xyz/#/TuringStaking) page, and click on the "Simulate" button to the right of each collator.
