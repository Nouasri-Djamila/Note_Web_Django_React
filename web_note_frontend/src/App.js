import { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import AddNotePage from "./pages/AddNotePage";
import EditNotePage from "./pages/EditNotePage";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import { TbError404Off } from "react-icons/tb"

const App = () => {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterText, setFilterText] = useState("");

  const handleFilterText = (val) => {
    setFilterText(val);
  };

  const handelSearchText = (val) => {
    setSearchText(val);
  };

  const filteredNotes =
    filterText === "BUSINESS"
      ? notes.filter((note) => note.category == "BUSINESS")
      : filterText === "PERSONAL"
      ? notes.filter((note) => note.category == "PERSONAL")
      : filterText === "IMPORTANT"
      ? notes.filter((note) => note.category == "IMPORTANT")
      : notes;





useEffect(() => {
  if(searchText.length < 3) {
    setNotes(allNotes);  // Revenir à toutes les notes si < 3 caractères
    return;
  }
  
  axios.get(`http://127.0.0.1:8000/notes-search/?search=${searchText}`)
  .then(res => {
    console.log(res.data)
    setNotes(res.data)  // Mettre à jour les notes affichées
  })
  .catch(err => console.log(err.message))
}, [searchText, allNotes])

// Modifier le useEffect initial
useEffect(() => {
  setIsLoading(true);
  axios
    .get("http://127.0.0.1:8000/notes/")
    .then((res) => {
      setAllNotes(res.data);  // Sauvegarder toutes les notes
      setNotes(res.data);     // Afficher toutes les notes initialement
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err.message);
    });
}, []);

  const addNote = (data) => {
    axios
      .post("http://127.0.0.1:8000/notes/", data)
      .then((res) => {
        setNotes([...notes, data]);
        toast.success("A new note has been added");
        console.log(res.data);
      })

      .catch((err) => {
        console.log(console.log(err.message));
      });
  };

  const updateNote = (data, slug) => {
    axios
      .put(`http://127.0.0.1:8000/notes/${slug}/`, data)
      .then((res) => {
        console.log(res.data);
        toast.success("Note updated succesfully");
      })

      .catch((err) => console.log(err.message));
  };

const deleteNote = (slug) => {
  axios.delete(`http://127.0.0.1:8000/notes/${slug}/`)
    .then((res) => {
      setNotes(notes.filter(note => note.slug !== slug));
      toast.success("Note deleted successfully!");
    })
    .catch((err) => {
      console.log(err.message);
      toast.error("Failed to delete note");
    });
};

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <MainLayout
            searchText={searchText}
            handelSearchText={handelSearchText}
          />
        }
      >
        <Route
          index
          element={
            <HomePage
              notes={filteredNotes}
              loading={isLoading}
              handleFilterText={handleFilterText}
            />
          }
        />
        <Route path="/add-note" element={<AddNotePage addNote={addNote} />} />
        <Route
          path="/edit-note/:slug"
          element={<EditNotePage updateNote={updateNote} />}
        />
        <Route
          path="/notes/:slug"
          element={<NoteDetailPage deleteNote={deleteNote} />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;