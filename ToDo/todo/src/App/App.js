import SelectActionCard from "../components/SelectActionCard";
import Nav from "../components/Nav";
import "./App.css";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

import { getActivities } from "../services/activityApi";
import { createActivity } from "../services/activityApi";

function App() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [when, setWhen] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAdd = async () => {
    try {
      await createActivity({
        name,
        when: when + ":00", //DateTime format
      });

      // refresh list
      const updated = await getActivities();
      setActivities(updated);

      // reset form
      setName("");
      setWhen("");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add activity");
    }
  };

  const [activities, setActivities] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    getActivities()
      .then(setActivities)
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Nav />
      <div className="main">
        <h1 className="title">กระดานกิจกรรม</h1>
        <div className="button-container">
          <button className="add" onClick={handleOpen}>
            Add
          </button>
          <button className="edit">Edit</button>
          <button className="remove">Remove</button>
        </div>
        <SelectActionCard
          activities={activities}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Activity</DialogTitle>

          <DialogContent>
            <TextField
              label="Activity Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Date & Time"
              type="datetime-local"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={when}
              onChange={(e) => setWhen(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAdd} variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default App;
