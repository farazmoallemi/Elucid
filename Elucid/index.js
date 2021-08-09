const { graphqlHTTP } = require('express-graphql');

/* eslint-disable no-restricted-syntax */
const elucidExtension = (info, context) => {
  // ('Result' carries the GQL query result data, and 'context' carries res.)

  const nullFields = [];

  function elucidExtensionHelper(data) {
    for (let keys in data) {
      // if key is null then we push to nullFields array
      if (data[keys] === null) {
        nullFields.push(` ${keys}`);
      }
      // account for nested objects within keys
      // if key is not null and is object, check if there are any null values in the nested object
      else if (data[keys] !== null && typeof data[keys] === 'object') {
        elucidExtensionHelper(data[keys]);
      }
    }

    return nullFields;
  }

  const fields = elucidExtensionHelper(info);

  return { message: 'Data not found in field(s): ' + fields };
};

// Extensions variable is necessary for the 'extensions' property of graphqlHTTP
// to work correctly. The callback contains the invocation of our 'elucidate' error-
// handler function.
const extensions = ({ result, context }) => {
  return {
    // 'elucidate' function parses 200 OK responses to decide if additional
    // error handling is necessary
    elucid: elucidExtension(result.data, context),
  };
};

// Handle requests to GraphQL endpoint:
function elucidate(schema, resolvers, graphiqlOption) {
  return (req, res) => {
    graphqlHTTP({
      schema: schema,
      rootValue: resolvers,
      graphiql: graphiqlOption.graphiql,
      pretty: true,
      context: { req, res },
      // customFormatErrorFn: (err) => {
      //   // Here we define any *additional* error-handling behavior for
      //   // errors that Express-graphQL DOES catch by itself:
      //   // res.status(420);
      //   // return err.message;
      // },
      extensions,
    })(req, res);
  };
}

module.exports = elucidate;
