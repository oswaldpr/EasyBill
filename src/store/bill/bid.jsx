import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {executeBidAction, updateBidAmount, updateShowBidSection} from "./billSlice.js";

export function Bid() {
    const showBidSection = useSelector((state) => state.bill.showBidSection)
    const bidAmount = useSelector((state) => state.bill.bidAmount)
    const dispatch = useDispatch()

    const showBidSectionClass = showBidSection ? 'margin-auto showBidSection_bid' : 'margin-auto showBidSection_bid hidden';

    return (
        <div className="section flex">
            <div className="showBidSection_checkbox flex">
                <input name="showBidSection" type="checkbox" onChange={(e) => dispatch(updateShowBidSection(e.target.checked))}/>
                <label htmlFor="showBidSection">Show bid section</label>
            </div>
            <div className={showBidSectionClass}>
                <button aria-label="Increment value" onClick={() => dispatch(executeBidAction('add'))}>
                    Add
                </button>
                <input type="number" placeholder="bid" value={bidAmount} onChange={(e) => dispatch(updateBidAmount(e.target.value))}/>
                <button aria-label="Decrement value" onClick={() => dispatch(executeBidAction('remove'))}>
                    Remove
                </button>
            </div>
        </div>
    )
}