import { useSelector, useDispatch } from 'react-redux'
import {
    updateCity,
    updateHasRunDrive,
    updateRunDrive,
    updateShowCompanyBillSection,
} from "./billSlice.js";
import {Table} from "./table.jsx";
import {getCityList} from "../../data/taxGridFees.js";

export function CompanyBill() {
    const companyBillingModel = useSelector((state) => state.bill.companyBillingModel)
    const showCompanyBillSection = useSelector((state) => state.bill.showCompanyBillSection)
    const hasRunDrive = useSelector((state) => state.bill.hasRunDrive)
    const dispatch = useDispatch()

    const cityList = getCityList();
    let cityOptionList = cityList.map((city)=>{
        return <option key={city} value={city}>{city}</option>
    })
    const showSectionClass = showCompanyBillSection ? 'margin-auto' : 'margin-auto hidden';
    const runDriveClass = hasRunDrive ? 'section_checkbox' : 'section_checkbox hidden';

    return (
        <div className="section section_table">
            <div className="section_checkbox">
                <input name="showCompanyBillingSection" type="checkbox" onChange={(e) => dispatch(updateShowCompanyBillSection(e.target.checked))}/>
                <label htmlFor="showCompanyBillingSection">Show company bill section</label>
            </div>
            <div className={showSectionClass}>
                <div className="selectors section flex">
                    <div className="province_select width_50">
                        <label>City: </label>
                        <select className="size_medium width_50" name="city" onChange={(e) => dispatch(updateCity(e.target.value))}>
                            {cityOptionList}
                        </select>
                    </div>
                    <div className="width_50">
                        <div className="section_checkbox">
                            <input name="hasRunDrive" type="checkbox" onChange={(e) => dispatch(updateHasRunDrive(e.target.checked))}/>
                            <label htmlFor="hasRunDrive">Has run and drive fees</label>
                        </div>
                        <div className={runDriveClass}>
                            <input name="runDrive" type="checkbox" onChange={(e) => dispatch(updateRunDrive(e.target.checked))}/>
                            <label htmlFor="runDrive">The car runs and drives</label>
                        </div>
                    </div>
                </div>
                <Table model={companyBillingModel}/>
            </div>
        </div>
    )
}