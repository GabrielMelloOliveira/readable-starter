import React from 'react'
import { Badge } from 'react-bootstrap'

export function formattingDate(timestamp) {
    var date = new Date(timestamp),
        day  = date.getDate().toString(),
        dayFormated = (day.length === 1) ? '0' + day : day,
        month  = (date.getMonth() + 1).toString(),
        monthFormated = (month.length === 1) ? '0' + month : month,
        yearFormated = date.getFullYear();

    return `${dayFormated}/${monthFormated}/${yearFormated}`
}

export function selectBadgeByVoteScore(voteScore) {
    let variant = 'warning'

    if (voteScore > 1) {
        variant = 'success'
    } else if (voteScore < 1) {
        variant = 'danger'
    }

    return <Badge variant={variant}>VoteScore {voteScore}</Badge>
}