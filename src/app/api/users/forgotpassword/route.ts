import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });
    console.log(user._id);

    if (!user) {
      return NextResponse.json({ error: "user not exist" }, { status: 400 });
    }

    //send password reset
    await sendEmail({ email, emailType: "RESET", userId: user._id });

    const response = NextResponse.json({
      message: "user verified successfully",
      success: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
