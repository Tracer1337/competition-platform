import React from "react"
import clsx from "clsx"
import { Select as MuiSelect, MenuItem, FormControl, InputLabel } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    select: {
        minWidth: 120
    }
}))

function Select({ label, options, className, value, onChange }) {
    const classes = useStyles()

    return (
        <FormControl className={clsx(className, classes.select)}>
            <InputLabel>{ label }</InputLabel>

            <MuiSelect value={value} onChange={onChange}>
                {options.map(({ name, value }) => (
                    <MenuItem value={value} key={value}>
                        { name}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    )
}

export default Select