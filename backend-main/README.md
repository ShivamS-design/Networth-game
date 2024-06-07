Prisma and Supabase Integration for Networth Game React App

Endpoints;

MULTIPLIER_NUM: value from 0-9 or infinity
WALLET_ADDRESS: any unique id or wallet address of user 

/createuser?user_id=WALLET_ADDRESS&counter=MULTIPLIER_NUM (to create new Supabase "networth" table record)

/updateuser?user_id=WALLET_ADDRESS&counter=MULTIPLIER_NUM (to update record)

/getuser?user_id=WALLET_ADDRESS (to get a user, and check if user exists)

/getusers (to get all users in networth table)

Base URL: https://backend-rose-xi.vercel.app/
