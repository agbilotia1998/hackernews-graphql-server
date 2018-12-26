const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

// let links = [{
//   id: 'link-0',
//   url: 'www.howtographql.com',
//   description: 'Fullstack tutorial for GraphQL'
// }];
// let idCount = links.length;
//
// const resolvers = {
//   Query: {
//     info: () => `API for hacker news clone`,
//     feed: () => links,
//     fetchLink: (parent, args) => {
//       let result = null;
//
//       links.forEach((link) => {
//         if(link.id === args.id){
//           result = link;
//         }
//       });
//
//       if(!result) {
//         console.log('No link with matching ID found');
//       } else {
//         return result;
//       }
//     }
//   },
//
//   // Link: {
//   //   id: (parent) => parent.id,
//   //   description: (parent) => parent.description,
//   //   url: (parent) => parent.url
//   // },
//
//   Mutation: {
//     postLink: (parent, args) => {
//       const link = {
//         id: `link-${idCount++}`,
//         description: args.description,
//         url: args.url
//       };
//
//       links.push(link);
//       return link;
//     },
//
//     updateLink: (parent, args) => {
//       let result = null;
//
//       links.forEach((link) => {
//         if(link.id === args.id){
//           link.description = args.description;
//           link.url = args.url;
//           result = link;
//         }
//       });
//
//       if(!result) {
//         console.log('No link with matching ID found');
//       } else {
//         return result;
//       }
//     },
//
//     deleteLink: (parent, args) => {
//       let result = null;
//
//       links.forEach((link) => {
//         if(link.id === args.id){
//           const index = links.indexOf(link);
//           links.splice(index);
//           result = link;
//         }
//       });
//
//       if(!result) {
//         console.log('No link with matching ID found');
//       } else {
//         return result;
//       }
//     }
//   }
// };

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links()
    },
    fetchLink: (root, args, context) => {
      // let result = null;
      //
      // links.forEach((link) => {
      //   if(link.id === args.id){
      //     result = link;
      //   }
      // });
      //
      // if(!result) {
      //   console.log('No link with matching ID found');
      // } else {
      //   return result;
      // }
      return context.prisma.link({
        id: args.id
      })
    }
  },

  Mutation: {
    postLink: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },

    updateLink: (root, args, context) => {
      // let result = null;

      // links.forEach((link) => {
      //   if(link.id === args.id){
      //     link.description = args.description;
      //     link.url = args.url;
      //     result = link;
      //   }
      // });
      //
      // if(!result) {
      //   console.log('No link with matching ID found');
      // } else {
      //   return result;
      // }

      return context.prisma.updateLink({
        data: {
          description: args.description,
          url: args.url
        },
        where: {
          id: args.id
        }
      })
    },

    deleteLink: (root, args, context) => {
      // let result = null;
      //
      // links.forEach((link) => {
      //   if(link.id === args.id){
      //     const index = links.indexOf(link);
      //     links.splice(index);
      //     result = link;
      //   }
      // });
      //
      // if(!result) {
      //   console.log('No link with matching ID found');
      // } else {
      //   return result;
      // }
      return context.prisma.deleteLink({
        id: args.id
      })
    }
  }
};


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
});

server.start(() => {
  console.log('Server started')
});