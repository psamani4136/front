import React from 'react'

import { SyllabusDropdownItem } from "./SyllabusDropdownItem"

export const SyllabusDropdownMenu = () => {
    return (
        <div className="syllabus-dropdown">
            <SyllabusDropdownItem>
                <h8>Primary Syllabuses</h8>
            </SyllabusDropdownItem>
            <SyllabusDropdownItem>
                <h8>Junior Secondary Syllabuses</h8>
            </SyllabusDropdownItem>
            <SyllabusDropdownItem>
                <h8>Senior Secondary Syllabuses</h8>
            </SyllabusDropdownItem>
        </div>
    )
}
