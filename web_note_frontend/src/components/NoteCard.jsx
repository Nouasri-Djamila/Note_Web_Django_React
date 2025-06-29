import React from 'react'
import { MdMarkunread } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { FormatDate } from './FormatDate.js';
import { Link } from 'react-router-dom';

const NoteCard = ({note}) => {

  
  const body = `${note.body.split(" ").slice(0, 20).join(" ")} ...`
   const color = note.category == "BUSINESS" ? "blue" : note.category == "PERSONAL" ? "green" : "purple"
  return (
    <div className="col-md-4 single-note-item all-category">
      <div className="card card-body">
        <span className="side-stick" style={{ backgroundColor: color }}></span>
        <FaNoteSticky style={{ marginLeft: "auto", color: color}} />
        <a href={`/notes/${note.slug}`} style={{textDecoration: "none", color: "black"}}>
        <h5
          className="note-title text-truncate w-75 mb-0"
        >
          {note.title}
        </h5>
        </a>
        
        <p className="note-date font-12 text-muted">{FormatDate(note.updated)} </p>
        <div className="note-content">
          <p
            className="note-inner-content text-muted"
          >
           {body}
          </p>
        </div>
        <div className="d-flex align-items-center">
       

          <span className="d-flex justify-contents-around">
            <a href="/note-detail">
              <MdMarkunread
                style={{ fontSize: "25px", cursor: "pointer", color: color }}
              />
            </a>

            <small className="text-muted">{note.category}</small>
          </span>
        </div>
      </div>
    </div>
  )
}

export default NoteCard