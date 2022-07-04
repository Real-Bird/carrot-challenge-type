import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../lib/server/withHandler";
import client from "../../lib/server/client";
import { withApiSession } from "../../lib/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email } = req.body;
  const foundEmail = await client.user.findUnique({
    where: {
      email: email
    }
  });
  if (!foundEmail) return res.json({ ok: false });
  req.session.user = {
    id: foundEmail.id
  };
  await req.session.save();
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
