import { useSelector, useDispatch } from 'react-redux'
import {
    updateHasRunDrive,
    updateRunDrive,
    updateShowCompanyBillSection,
} from "./billSlice.js";
import {Table} from "./table.jsx";

export function CompanyBill() {
    const companyBillingModel = useSelector((state) => state.bill.companyBillingModel)
    const showCompanyBillSection = useSelector((state) => state.bill.showCompanyBillSection)
    const hasRunDrive = useSelector((state) => state.bill.hasRunDrive)
    const dispatch = useDispatch()

    const showSectionClass = showCompanyBillSection ? 'margin-auto' : 'margin-auto hidden';
    const runDriveClass = hasRunDrive ? 'section_checkbox' : 'section_checkbox hidden';

    return (
        <div className="section section_table">
            <div className="section_checkbox">
                <input name="showCompanyBillingSection" type="checkbox" checked={showCompanyBillSection} onChange={(e) => dispatch(updateShowCompanyBillSection(e.target.checked))}/>
                <label htmlFor="showCompanyBillingSection">Show company bill section</label>
            </div>
            <div className={showSectionClass}>
                <h2 className="section_title">Senande fees</h2>
                <div className="selectors section">
                    <div className="">
                        <div className="section_checkbox">
                            <input name="hasRunDrive" type="checkbox" onChange={(e) => dispatch(updateHasRunDrive(e.target.checked))}/>
                            <label htmlFor="hasRunDrive">Container</label>
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