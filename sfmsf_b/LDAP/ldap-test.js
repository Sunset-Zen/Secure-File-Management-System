//const fs = require('fs');
const ldap = require('ldapjs');

function authorize(req, res, next) {
  if (!req.connection.ldap.bindDN.equals('cn=root')) return next(new ldap.InsufficientAccessRightsError());
  return next();
}

function loadPasswdFile(req, res, next) {
  req.users = [];
  var user1 = buildLDAPUser('jdoe','admin','eb6bd0d882f2874a81a537b3f27b75790f30373cd2979b095c73eea9ea8b4366','CHRy6UER');
  var user2 = buildLDAPUser('jdoe2','user','password','biJMPbLT');
  var user3 = buildLDAPUser('jdoe3','moderator','password','60MIEoEa');
  req.users.push(user1);
  req.users.push(user2);
  req.users.push(user3);
  //console.log(req.users);
  return next();
}

function buildLDAPUser(cn, role, password, salt){
  var newUser = {
    dn: "cn=" + cn + ",o=myhost",
    attributes:
    {
      cn: cn,
      password: password, //TODO: add encryption / hash algorithm here
      role: role,
      salt: salt,
      objectclass: 'user'
    }
  }
  //console.log(newUser.dn);
  return newUser;
}

const pre = [authorize, loadPasswdFile];



///--- Mainline

const server = ldap.createServer();

server.bind('cn=root', (req, res, next) => {
  if (req.dn.toString() !== 'cn=root' || req.credentials !== 'secret')
    return next(new ldap.InvalidCredentialsError());
  console.log("root bound");
  res.end();
  return next();
});


server.add('o=myhost', pre, (req, res, next) => {
  //not implemented

  // if (!req.dn.rdns[0].cn)
  //   return next(new ldap.ConstraintViolationError('cn required'));

  // if (req.users[req.dn.rdns[0].cn])
  //   return next(new ldap.EntryAlreadyExistsError(req.dn.toString()));

  // const entry = req.toObject().attributes;

  // if (entry.objectclass.indexOf('commonUser') === -1)
  //   return next(new ldap.ConstraintViolationError('entry must be a commonUser'));

  // const opts = ['-m'];
  // if (entry.description) {
  //   opts.push('-c');
  //   opts.push(entry.description[0]);
  // }
  // if (entry.password) {
  //   opts.push('-p');
  //   opts.push(entry.password[0]);
  // }
  // opts.push(entry.cn[0]);
});

server.search('o=myhost', pre, (req, res, next) => {
  //console.log(req);
  const keys = Object.keys(req.users);
  for (const k of keys) {
    if (req.filter.matches(req.users[k].attributes)){
      res.send(req.users[k]);
      console.log(req.users[k]);
    }
  }
  console.log("db was searched");
  res.end();
  return next();
});

server.listen(389, '127.0.0.1', () => {
  console.log('LDAP server up at: %s', server.url);
});