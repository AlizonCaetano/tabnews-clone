function status(req, res) {
  res.status(200).send({ chave: "sou acima da média" });
}

export default status;
