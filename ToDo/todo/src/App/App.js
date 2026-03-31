import SelectActionCard from "../components/SelectActionCard";
import { deleteActivity } from "../services/activityApi";
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

import {
  getActivities,
  createActivity,
  updateActivity,
} from "../services/activityApi";

function App() {
  const [activities, setActivities] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const [when, setWhen] = useState("");
  const handleOpen = () => {
    setIsEditMode(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setIsEditMode(false);
  };
  const handleAdd = async () => {
    try {
      console.log(when);
      await createActivity({
        name,
        when: when + ":00", //DateTime format
      });

      // refresh list
      const updated = await getActivities();
      setActivities(updated);

      // reset form
      setName("");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add activity");
    }
  };

  const handleEdit = async () => {
    try {
      await updateActivity(selectedCard.id, {
        name,
        when: when + ":00",
      });

      const updated = await getActivities();
      setActivities(updated);

      setOpen(false);
    } catch (err) {
      if (err.message?.includes("did not match the expected pattern")) {
        const updated = await getActivities();
        setActivities(updated);
        setOpen(false);
        return;
      }
      console.error(err);
      alert("Failed to edit activity");
    }
  };

  const handleRemove = async () => {
    try {
      await deleteActivity(selectedCard.id);

      // refresh list
      const updated = await getActivities();
      setActivities(updated);
      setSelectedCard(null);
    } catch (err) {
      const updated = await getActivities();
      setActivities(updated);
      setSelectedCard(null);
    }
  };

  useEffect(() => {
    getActivities()
      .then(setActivities)
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Nav />
      <div
        className="main"
        onClick={() => {
          if (!open) setSelectedCard(null);
        }}
      >
        <h1 className="title">กระดานกิจกรรม</h1>
        <div className="button-container">
          <button className="add" onClick={handleOpen}>
            Add
          </button>
          <button
            className="edit"
            onClick={(e) => {
              e.stopPropagation();

              if (!selectedCard) return;
              setName(selectedCard.name);
              console.log(selectedCard.when.slice(0, 16));
              setWhen(selectedCard.when.slice(0, 16));

              setIsEditMode(true);
              setOpen(true);
            }}
            disabled={!selectedCard}
          >
            Edit
          </button>

          <button
            className="remove"
            onClick={handleRemove}
            disabled={!selectedCard}
          >
            Remove
          </button>
        </div>
        <SelectActionCard
          activities={activities}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {isEditMode ? "Edit Activity" : "Add Activity"}
          </DialogTitle>

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
              value={when}
              onChange={(e) => {
                setWhen(e.target.value);
              }}
              inputLabel={{
                shrink: true,
              }}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={isEditMode ? handleEdit : handleAdd}
              variant="contained"
            >
              {isEditMode ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default App;
