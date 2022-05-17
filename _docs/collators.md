---
title: Collator Guide
subtitle: This document covers the operating and token requirements of a collator
author: irsal
tags: [dpos, collators]
---

## Pre-requisites to start producing blocks

Before you start producing blocks and earning rewards as a collator, you must first setup your node. Head over to the following pages for a tutorial on the node setup:

1. [Experienced Node Operators](../node-operator-requirements)
2. [Using our partner services](../node-operator-requirements-service)

If you have any questions or run into issues, head over to the [OAK Discord](https://discord.gg/7W9UDvsbwh) for help.

## Network Specific Information

### Neumann Network - Testnet

- [PolkadotJS Extrinsics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.testnet.oak.tech#/extrinsics) - use this to execute post calls or functions (e.g. signing up to be a collator)
- [Chain State](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.testnet.oak.tech#/chainstate) - use this to query fungible storage items (e.g. the number of selected candidates)
- [Chain Constants](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.testnet.oak.tech#/chainstate/constants) - use this to query constants for the blockchain (e.g. any parameter with a `const` below)
- [Telemetry](https://telemetry.polkadot.io/#list/0x42e75532d6809775cef4b9ca8e4bb49be2dc1e87c9ff1ba299e78481b5cb3047)

| Field                                                          | Current Value                                              |
| -------------------------------------------------------------- | ---------------------------------------------------------- |
| Minimum Collator Bond `const parachainStaking.minCandidateStk` | 1MM NEU or `10000000000000000` planck                      |
| Number of selected candidates `parachainStaking.totalSelected` | 10                                                         |
| Round Length                                                   | 25 blocks or ~5 minutes                                    |
| Leave candidacy duration                                       | X rounds or ~Y hours                                       |
| Revoke candidacy duration                                      | X rounds or ~Y hours                                       |
| Reduction of self-delegation bond duration                     | X rounds or ~Y hours                                       |
| Rewards payout                                                 | Time left to complete current round + X rounds or ~Y hours |

_Note: The source of truth for the values above is the chain state and constants, so please query that to double-check the values_

### Turing Network - Kusama Parachain

- [PolkadotJS Extrinsics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/extrinsics) - use this to execute post calls or functions (e.g. signing up to be a collator)
- [Chain State](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/chainstate) - use this to query fungible storage items (e.g. the number of selected candidates)
- [Chain Constants](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/chainstate/constants) - use this to query constants for the blockchain (e.g. any parameter with a `const` below)
- [Telemetry](https://telemetry.polkadot.io/#list/0x0f62b701fb12d02237a33b84818c11f621653d2b1614c777973babf4652b535d)

| Field                                                          | Current Value                                              |
| -------------------------------------------------------------- | ---------------------------------------------------------- |
| Minimum Collator Bond `const parachainStaking.minCandidateStk` | 1MM NEU or `10000000000000000` planck                      |
| Number of selected candidates `parachainStaking.totalSelected` | 10                                                         |
| Round Length                                                   | 600 blocks or ~2 hours                                     |
| Leave candidacy duration                                       | X rounds or ~Y hours                                       |
| Revoke candidacy duration                                      | X rounds or ~Y hours                                       |
| Reduction of self-delegation bond duration                     | X rounds or ~Y hours                                       |
| Rewards payout                                                 | Time left to complete current round + X rounds or ~Y hours |

_Note: The source of truth for the values above is the chain state and constants, so please query that to double-check the values_

## How to register as a collator

## How to leave as a collator

## FAQ

For any questions unaddress here or any support, please reach out via [OAK Discord](https://discord.gg/7W9UDvsbwh), or email <collators@oak.tech>.

### Why does it take a while to unbond my tokens?

Coming soon...
