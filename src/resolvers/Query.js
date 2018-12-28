function info () {
  `This is the API of a Hackernews Clone`
}

async function feed (root, args, context, info) {
  const where = args.filter ? {
    OR: [
      { description_contains: args.filter },
      { url_contains: args.filter }
    ]
  } : {};

  const links = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  });

  const count = await context.prisma
    .linksConnection({
      where,
    })
    .aggregate()
    .count();

  return links;
}

async function links(root, args, context, info) {
  const where = args.filter ? {
    OR: [
      { description_contains: args.filter },
      { url_contains: args.filter }
    ]
  } : {};

  const allLinks = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  });

  return allLinks;
}

function fetchLink (root, args, context) {
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

module.exports = {
  info: info,
  feed: feed,
  fetchLink: fetchLink,
  links: links
};