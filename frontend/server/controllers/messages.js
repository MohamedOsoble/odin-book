const messageDb = require("../queries/messages");

exports.home = async (req, res, next) => {
  const userConversations = await messageDb.conversationsHome(req.user.id);
  return res.json(userConversations);
};

exports.getFriends = async (req, res, next) => {
  const friends = await messageDb.getFriends(req.user.id);
  console.log(friends);
  return res.json(friends);
};

exports.getConversation = async (req, res, next) => {
  const conversation = await messageDb.getConversation(
    req.params.conversationId,
  );
  return res.json(conversation);
};

exports.newConversation = async (req, res, next) => {
  const userId = req.user.id;
  const recipientId = req.params.recipientId;
  const conversation = messageDb.newConversation(userId, recipientId);
}