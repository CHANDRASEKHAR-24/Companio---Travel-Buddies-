import { useState } from "react";
import PropType from "prop-types";
import axios from 'axios';

const InviteFriendsModal = ({ onClose  }) => {
  const [email, setEmail] = useState("");

  const handleSubmit2 = (e) => {
    e.preventDefault();

    // Perform the logic to send an email to the entered email address
    // This could involve making an API call or using a service to send the email

    // Reset the form
    setEmail("");

    // Close the modal
    onClose();
  };



  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/send-email', {
        to : email,
      });
      console.log('Email sent successfully!')
    } catch (error) {
      console.log(error)
      console.log('Failed to send email.');
    }
    onClose();
  };

  return (
    <div className="model ">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            style={{border : "1px solid black" , borderRadius : "50px"}}
            required
          />

          <div className="row">
            <button type="submit" className="link">Invite friend</button>

            <button type="button" className="link" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

InviteFriendsModal.propTypes = {
  onClose: PropType.func.isRequired,
};

const InviteFriend = () => {
  const [showModal, setShowModal] = useState(false);

  const handleInviteFriends = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button
        onClick={handleInviteFriends}
        style={{
          display: showModal ? "none" : "block",
        }}
      >
        Invite Friends
      </button>

      {showModal && <InviteFriendsModal onClose={handleCloseModal} />}
    </div>
  );
};

export default InviteFriend;
