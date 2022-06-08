## Project Management System Backend(GraphQL) & Frontend(ReactJs)
This project uses: 
- graphql
- express-graphql
- MongoDB
- React for the frontend

### Environment Variables
In your `.env `  include your postgress **DATABASE_URL**

`DATABASE_URL="postgresql://<user>:<password>@localhost:5432/f<database_name>?schema=public"
`
### Testing your GraphQL api

1. Clone this repo to your PC
2. Run the development server with 
```bash
npm run dev
```
### Test data

To use these data open [http://localhost:3000](http://localhost:3000) with your browser to test your graphql server using **studio apollographql**.

**create a card**
```
mutation {
  createCard(question: "What is nextjs?", description: "Be brief", answer: "A library") {
    id
  }
}
```

**To view all cards**
```
query AllCards {
  allCards {
    id
    question
    description
    answer
  }
}
```
