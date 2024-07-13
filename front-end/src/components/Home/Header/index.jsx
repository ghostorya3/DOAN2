import Image from "../../Image";
import { useMyContext } from "../../context";
import AddIcon from "@mui/icons-material/Add";
import Card from "../../Card/index";
import { useState } from "react";
import { Fab } from "@mui/material";
export default function Header({
  classNamee,
  isClass,
  isTeacher,
  id,
  idClass,
}) {
  const { user } = useMyContext();
  const [openCard, setOpenCard] = useState(false);
  return (
    <div className="border p-2 flex items-center justify-between h-16">
      <div className="flex items-center">
        <div className="w-12 h-10 ml-10">
          <Image src="/Google-Classroom.png"></Image>
        </div>
        <h1 className="text-2xl font-medium text-gray-500">Classroom</h1>
        {classNamee && (
          <div className="text-2xl font-medium text-gray-500">
            &nbsp; &gt; &nbsp;{classNamee}-{idClass}
          </div>
        )}
      </div>
      <div className="relative flex items-center box-border">
        <Fab
          color="primary"
          aria-label="add"
          fontSize="small"
          style={{ width: "40px", height: "40px", marginRight: "15px" }}
          onClick={() => setOpenCard((item) => !item)}
        >
          <AddIcon />
        </Fab>

        <div className="absolute right-16 top-12 z-50">
          {openCard && (
            <Card isClass={isClass} isTeacher={isTeacher} id={id}></Card>
          )}
        </div>
        <div className="group">
          <div className="w-10 h-10 rounded-full cursor-pointer">
            <Image
              src={
                user
                  ? user.avatar
                  : "/277894110_720178642472643_59267636986975849_n.jpg"
              }
              attribute={"rounded-full"}
            ></Image>
          </div>
          <div className="absolute group-hover:flex hidden top-12 right-2 border bg-slate-100 w-40 h-10  justify-center items-center rounded-md">
            Đăng xuất
          </div>
        </div>
      </div>
    </div>
  );
}
