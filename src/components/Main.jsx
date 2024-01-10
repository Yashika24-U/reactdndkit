import React, { useState } from "react";
import "./Main.css";
import { data } from "../data";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { arrayMove } from '@dnd-kit/sortable';

import { CSS } from "@dnd-kit/utilities";

const SortableUser = ({ user }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: user.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="users-div"
    >
      {user.name}
    </div>
  );
};
const Main = () => {
  const [user, setUser] = useState(data);
  const [input, setInput] = useState("");
  const addUser = () => {
    const newUser = {
      id: Date.now().toString(),
      name: input,
    };
    setInput("");
    setUser((prevVal) => [...prevVal, newUser]);
  };


  const onDragEnd = (event) => {
    // console.log("onDragEnd:", event);
    const {active,over} = event;
    if(active.id === over.id)  {return}
    setUser((user)=>{
        const oldIndex = user.findIndex((user)=>user.id === active.id)
        const newIndex = user.findIndex((user)=>user.id === over.id)
        return arrayMove(user, oldIndex, newIndex)
    })
  };

  return (
    <>
      <div className="main-div">
        <div>Total : {user.length}</div>
        <div className="section-one">
          <input
            type="text"
            placeholder="Enter Name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addUser}>Add User</button>
        </div>

        <div>
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext
              items={user}
              strategy={verticalListSortingStrategy}
            >
              {user.map((user, idx) => {
                return <SortableUser key = {user.id} user={user} />;
              })}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </>
  );
};

export default Main;
