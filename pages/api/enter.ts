import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../lib/server/withHandler";
import client from "../../lib/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      body: { name, email }
    } = req;
    const alreadyExists = Boolean(
      await client.user.findUnique({
        where: {
          email
        },
        select: {
          id: true
        }
      })
    );
    if (alreadyExists) {
      return res.json({
        ok: false,
        error: "해당 이메일은 이미 존재합니다."
      });
    }
    await client.user.create({
      data: {
        email,
        name
      }
    });
    res.json({
      ok: true
    });
  }
  return res.json({
    ok: true
  });
}

export default withHandler({
  methods: ["POST", "GET"],
  handler,
  isPrivate: false
});
