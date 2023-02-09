---
title: Verify Runtime of Upgrade
subtitle: Learn how to verify a runtime upgrade proposed through governance
author: laura
tags: [governance]
date: 2022-06-30
---

### Finding the Proposal

To find the proposed runtime upgrade navigate to [Turing's Democracy page](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/democracy).  If a runtime upgrade has been proposed you will see a proposal under the `proposals` section for `parachainSystem.authorizeUpgrade` as shown in the image below.  For this example we are using a proposed runtime upgrade to v1.4.0.1.

![democracy-page](../../../assets/img/governance/democracy-page.png)

### Upgrade Preimage Information

Once you have identified the proposal click on the arrow next to `parachainSystem.authorizeUpgrade` and expand for more details.  There you will see the H256 code hash for the corresponding release version v1.4.0.1.

`0xfd8d2ee0b16c13a242e41e64b08d3b5e8470d2dd2e9228e1d8affcf3fc0628c2`

![authorize-upgrade-proposal](../../../assets/img/governance/authorize-upgrade-proposal.png)

### Verify Code

The necessary information to verify the code can be found in the corresponding release page on Github.  The release page for v1.4.0.1 can be found [here](https://github.com/OAK-Foundation/OAK-blockchain/releases/tag/v1.4.0.1).  To view previous releases you can navigate [here](https://github.com/OAK-Foundation/OAK-blockchain/releases).

First, you will want to verify the `BLAKE2_256` hash in the release notes matches the proposal `codeHash` from the previous section.  Next, you can build your own WASM runtime to compare with the proposed upgrade.

![release-page-output](../../../assets/img/governance/release-page-output.png)

#### Build WASM Runtime for the Release

1. Install [srtool](https://github.com/paritytech/srtool#install).
2. Follow the directions in OAK-blockchain repository to [build from source](https://github.com/OAK-Foundation/OAK-blockchain#building-from-source).
3. Checkout release branch.
```
git checkout v1.4.0.1
```
4. Build release with srtool.
```
srtool build --package turing-runtime
```
5. Make note of `BLAKE2_256` hash of the `compressed` WASM after the srtool completes building.

![srtool-output](../../../assets/img/governance/srtool-output.png)

#### Compare Hash

Navigate to the [Developer - Extrinsics tab](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/extrinsics).  Use the `parachainSystem` extrinsic to `authorizeUpgrade` as shown in the image below.  Paste the `BLAKE2_256` hash noted in step 5 above into the `codeHash` field.  Compare the `encoded call hash` and ensure it matches the `proposal hash` found in the first section of this document, `Finding the Proposal`.

![authorize-upgrade-extrinsic](../../../assets/img/governance/authorize-upgrade-extrinsic.png)