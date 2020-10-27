import React from "react"
import { Button } from "@material-ui/core"
import LinkIcon from "@material-ui/icons/Link"

function Project({ className, project, ...props }) {
    if (project.project_url) {
        return (
            <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outlined" color="primary" className={className} startIcon={<LinkIcon />} {...props}>
                    Open Project
                </Button>
            </a>
        ) 
    }

    return null
}

export default Project