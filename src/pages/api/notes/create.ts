import { githubUpdateFile } from "@louisandrew3/gh-update-files";
import type { NextApiRequest, NextApiResponse } from "next";

type GenericResponse = {
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenericResponse>
) {
  const { note } = req.body as { note?: string };
  if (!note) {
    res.status(400).send({ msg: "Note is required." });
    return;
  }

  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ msg: "Unauthorized." });
    return;
  }

  const [_, token] = authorization.split(" ");
  if (!token) {
    res.status(401).send({ msg: "Unauthorized." });
    return;
  }

  try {
    const success = await githubUpdateFile({
      path: "Commmonplace.md",
      accessToken: token,
      content: note,
      owner: "LouisAndrew",
      repo: "vault",
      updateMode: "append",
      addNewLine: true,
      createIfNotExists: true,
    });

    res.send({
      msg: success ? "Note created successfully." : "Note creation failed.",
    });
  } catch (e) {
    res.send({
      msg: "Something went wrong",
    });
  }
}
