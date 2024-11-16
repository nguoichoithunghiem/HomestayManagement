import React, { useEffect, useState } from 'react';
import './UpdateRoom.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateRoom = ({ url }) => {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate(); // For navigation after update
    const [room, setRoom] = useState({
        roomNumber: '',
        roomType: '',
        roomPrice: '',
        roomDescription: '',
        roomStatus: 'available',
        roomImage: null // To hold the image file
    });

    // Function to fetch current room information
    const fetchRoom = async () => {
        try {
            const response = await axios.get(`${url}/api/room/${id}`);
            if (response.data.success) {
                setRoom(response.data.data);
            } else {
                toast.error("Error fetching room information");
            }
        } catch (error) {
            toast.error("An error occurred");
            console.error("Error fetching room:", error);
        }
    };

    // Function to handle input changes
    const onChangeHandler = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            setRoom((prev) => ({ ...prev, roomImage: files[0] })); // Set image file
        } else {
            setRoom((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Function to handle form submission
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('roomNumber', room.roomNumber);
        formData.append('roomType', room.roomType);
        formData.append('roomPrice', room.roomPrice);
        formData.append('roomDescription', room.roomDescription);
        formData.append('roomStatus', room.roomStatus);
        if (room.roomImage) {
            formData.append('roomImage', room.roomImage); // Append the image file if it exists
        }

        try {
            const response = await axios.put(`${url}/api/room/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type for form data
                },
            });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/list-room');
            } else {
                toast.error("Error updating room");
            }
        } catch (error) {
            toast.error("An error occurred while updating");
            console.error("Error updating room:", error);
        }
    };

    useEffect(() => {
        fetchRoom(); // Fetch room info when component mounts
    }, []);

    return (
        <div className='update-room'>
            <h2>Update Room</h2>
            <form onSubmit={onSubmitHandler} className='update-form'>
                <div className='form-group'>
                    <label>Room Number:</label>
                    <input
                        type='text'
                        name='roomNumber'
                        value={room.roomNumber}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Room Type:</label>
                    <input
                        type='text'
                        name='roomType'
                        value={room.roomType}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Price:</label>
                    <input
                        type='number'
                        name='roomPrice'
                        value={room.roomPrice}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Description:</label>
                    <textarea
                        name='roomDescription'
                        value={room.roomDescription}
                        onChange={onChangeHandler}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label>Status:</label>
                    <select
                        name='roomStatus'
                        value={room.roomStatus}
                        onChange={onChangeHandler}
                        required
                    >
                        <option value='available'>Available</option>
                        <option value='unavailable'>Unavailable</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Room Image:</label>
                    <input
                        type='file'
                        name='roomImage'
                        accept='image/*'
                        onChange={onChangeHandler}
                    />
                </div>
                <button type='submit' className='update-btn'>Update</button>
            </form>
        </div>
    );
};

export default UpdateRoom;
