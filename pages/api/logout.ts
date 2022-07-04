import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from "../../lib/server/withHandler";
import { withApiSession } from "../../lib/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  req.session.destroy();
  res.json({ ok: true });
}

export default withApiSession(handler);
