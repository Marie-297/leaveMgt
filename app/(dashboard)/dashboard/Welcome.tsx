import Container from "@/components/common/Container";
import { User } from "@prisma/client";
// import DialogWrapper from "@/components/common/Dialog";
import RequestForm from "./RequestForm";

type Props = {
  user: User;
};

const WelcomeBanner = ({ user }: Props) => {
  return (
    <Container>
      <div className="flex flex-wrap justify-between items-center my-6 ">
        {/* LEFT SIDE */}
        <div className="flex justify-start items-center">
          <h2 className="text-xl font-extrabold leading-tight  lg:text-2xl">
            Welcome {user.name} 🤝!
          </h2>
        </div>

        {/* RIGHT SIDE  */}

        <div className="flex items-center space-x-3 md:space-x-1">
        {user.role === "USER" && <RequestForm user={user} />}
        </div>
      </div>
    </Container>
  );
};

export default WelcomeBanner;
