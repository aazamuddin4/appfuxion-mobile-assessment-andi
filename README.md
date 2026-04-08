# MobileTransactions

React Native (TypeScript) app for viewing a list of latest transactions and a transaction details screen with share support.

## Requirements covered

- Transactions list shows:
	- Transfer details (transfer name + recipient)
	- Date of transfer
	- Amount of transfer (supports negative amount)
- Tap a transaction → navigates to details screen
- Details screen shows:
	- Reference ID
	- Date
	- Recipient name
	- Transfer name
	- Amount
- Share details externally (native share sheet)
- State management: Zustand

## Project structure

- `src/data/mockTransactions.ts` – mocked BE response data
- `src/store/transactionsStore.ts` – Zustand store + mocked fetch
- `src/screens/transactions/*` – list + detail screens
- `src/utils/format.ts` – date/money formatting

## Setup

### Prerequisites

- Node.js (see `package.json` → `engines.node`)
- React Native environment setup:
	- https://reactnative.dev/docs/environment-setup

### Install dependencies

```zsh
cd MobileTransactions
npm install
```

## Run

### iOS

If CocoaPods isn’t installed yet:

```zsh
sudo gem install cocoapods
```

Install pods:

```zsh
cd ios
pod install
cd ..
```

Run:

```zsh
npm run ios
```

### Android

```zsh
npm run android
```

## Quality gates

```zsh
npm test
npm run lint
```

## Notes

- Currency formatting uses the device locale, with `USD` as the configured currency for consistency.
- The mocked fetch adds a small delay to simulate a real network call.
