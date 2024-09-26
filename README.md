## Summary about this APP

I created this application to learn how to integrate a Payment Gateway (Midtrans) with React/Next.Js. The concept of the application revolves around game or subscription top-ups.

Users can top up gold using real money, processed through Midtrans. The gold is then used to purchase items or images on this website. The conversion rate is 1 🪙 = 1000 IDR.

## Setup Environment

```sh
DATABASE_URL=""

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
CLERK_WEBHOOK_SECRET=""

MIDTRANS_SERVER_KEY=""
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=""
NEXT_PUBLIC_MIDTRANS_SANDBOX="https://app.sandbox.midtrans.com/snap/v1/transactions"
NEXT_PUBLIC_MIDTRANS_PRODUCTION="https://app.midtrans.com/snap/v1/transactions"

UPLOADTHING_TOKEN=''

NEXT_PUBLIC_LOCAL_URL="http://localhost:3000"
PRODUCTION_URL=""

```

## Running Locally

```sh
1. npx prisma generate && npx prisma db push
2. npm install
3. npm run dev
4. npm run build
```

## Deploy

[vercel](https://vercel.com)
