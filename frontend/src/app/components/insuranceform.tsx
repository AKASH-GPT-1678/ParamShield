import React, { useState } from "react";
import { InsuranceABI } from "../../../abi/insurance";
import { useContract } from "../newinsurance/page";
import { ethers } from "ethers";
const InsuranceForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        premium: "",
        sumAssured: "",
        payInterval: "",
        initialPayment: "",
        insuranceFor: "",
        holderRemark: "",
        startDate: "",
        endDate: "",
        numOfSubscribers: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        const tx = await useContract.newInsurance(
            "Life Policy",
            ethers.parseEther("1"),
            ethers.parseEther("100"),
            30,
            ethers.parseEther("0.5"),
            "Family",
            "My first insurance",
            Math.floor(Date.now() / 1000),   // _startDate
            Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
            10
        );

        await tx.wait();
        console.log("Insurance created:", tx.hash);



    };

    const trailContract = async () => {
        const tx = await useContract.newInsurance(
            "Life Policy",
            ethers.parseEther("1"),
            ethers.parseEther("100"),
            30,
            ethers.parseEther("0.5"),
            "Family",
            "My first insurance",
            Math.floor(Date.now() / 1000),   // _startDate
            Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
            10
        );

        await tx.wait();
        console.log("Insurance created:", tx.hash);


    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Insurance Form</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Policy Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded"
                    required
                />

                <input
                    type="number"
                    name="premium"
                    placeholder="Premium (ETH)"
                    value={formData.premium}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded"
                    required
                />

                <input
                    type="number"
                    name="sumAssured"
                    placeholder="Sum Assured (ETH)"
                    value={formData.sumAssured}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded"
                    required
                />

                <input
                    type="number"
                    name="payInterval"
                    placeholder="Payment Interval (days)"
                    value={formData.payInterval}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded"
                />

                <input
                    type="number"
                    name="initialPayment"
                    placeholder="Initial Payment (ETH)"
                    value={formData.initialPayment}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded"
                />

                <input
                    type="text"
                    name="insuranceFor"
                    placeholder="Insurance For"
                    value={formData.insuranceFor}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded"
                />

                <textarea
                    name="holderRemark"
                    placeholder="Remarks"
                    value={formData.holderRemark}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded"
                />

                <input
                    type="date"
                    name="startDate"
                    placeholder="Start Date"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded"
                />

                <input
                    type="date"
                    name="endDate"
                    placeholder="End Date"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded"
                />

                <input
                    type="number"
                    name="numOfSubscribers"
                    placeholder="Number of Subscribers"
                    value={formData.numOfSubscribers}
                    onChange={handleChange}
                    className="w-full p-3 mb-6 border rounded"
                />

                <button
                  
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
                    onClick={trailContract}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default InsuranceForm;
