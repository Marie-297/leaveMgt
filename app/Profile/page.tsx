import Container from "@/components/common/Container";
import { User } from "@prisma/client";
import { RxAvatar } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getCurrentUser } from "@/lib/session";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableWrapper from "@/components/common/TableWrapper";


const Profile = async() => {
  const user = await getCurrentUser();
  
  return (
    <div className="flex flex-col h-full items-center space-x-3 md:space-x-6 w-full">
      <TableWrapper title="PERSONAL DETAILS" buttonB={""} buttonA={""}>
        <Table>
          <TableBody>
            <TableRow>
              <Avatar className="w-20 h-20 rounded-full border border-solid  border-gray-300 z-0">
                <AvatarImage src={user?.image || "/default-avatar.png"} alt="Profile Photo" />
                <AvatarFallback className="bg-slate-950 text-white font-extrabold border-solid text-3xl">{user?.name?.[0] || <RxAvatar size = {50} />}</AvatarFallback>
              </Avatar>
            </TableRow>
            <TableRow>
              <TableCell className="text-lg md:text-xl font-extrabold text-blue-950">NAME</TableCell>
              <TableCell className="font-medium text-lg md:text-xl">{user?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-extrabold text-blue-950 text-lg md:text-xl">EMAIL ADDRESS</TableCell>
              <TableCell className="font-medium text-lg md:text-xl">{user?.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-extrabold text-blue-950 text-lg md:text-xl">PHONE NUMBER</TableCell>
              <TableCell className="font-medium text-lg md:text-xl">{user?.phone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-extrabold text-blue-950 text-lg md:text-xl">ROLE</TableCell>
              <TableCell className="font-medium text-lg md:text-xl">{user?.role === "ADMIN"? "ADMINISTRATOR" : "STAFF"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-extrabold text-blue-950 text-lg md:text-xl">DEPARTMENT</TableCell>
              <TableCell className="font-medium text-lg md:text-xl">{user?.department}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-extrabold text-blue-950 text-lg md:text-xl">TITLE</TableCell>
              <TableCell className="font-medium text-lg md:text-xl">{user?.title}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableWrapper>
    </div>
  );
}

export default Profile;	