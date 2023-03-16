import { ApolloServer, gql } from 'apollo-server';

// The GraphQL schema
const typeDefs = gql`
  type BoardReturn {
    number: Int,
    writer: String,
    title: String,
    contents: String
  }

  type Query {
    fetchBoards: [BoardReturn]
  }

  input CreateBoardInput {
    writer: String,
    title: String,
    contents: String
  }
  
  type Mutation {
    createBoard(createBoardInput: CreateBoardInput!): String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {

  Query: {
    fetchBoards: () => {
      const result = [
        {
          number: 1,
          writer: '철수',
          title: '제목입니다~~',
          contents: '내용이에요@@@',
        },
        {
          number: 2,
          writer: '영희',
          title: '영희 제목입니다~~',
          contents: '영희 내용이에요@@@',
        },
        {
          number: 3,
          writer: '훈이',
          title: '훈이 제목입니다~~',
          contents: '훈이 내용이에요@@@',
        },
      ];

      // 2. 꺼내온 결과 응답 주기
      return result;
    },
  },
  Mutation: {
    createBoard: (parent, args, context, info) => {
      console.log(args);
      return '게시물 등록 완료'
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url} on port 3000`);
});