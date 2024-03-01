import React from 'react';

function MyComponent(){
    return (
        <div>
            <div style={{position: "absolute", top: "2550px", width: '700px', height: '400px', textAlign:"center"}}>
            According to the US Census, 26.8% of the Alabama population is black and 64.7% is white.
            In their HoR, 26.4% of the members are black and 73.5% are white. We can conclude that
            white people are overrepresented, while black people very slightly underrepresented.</div>

            <div style={{position: "absolute", left:"50%", top: "2550px", width: '700px', height: '400px', textAlign:"center"}}>
            According to the US Census, 68% of the Delaware population is white, 23.8% is black and
            4.4% is asian. In their HoR, 73.17% of the members are white, 24.39% of them are black and 2.439% are asian.
            We can conclude that white people are overrepresented, black people are slightly overrepresented and asians
            are under represented.</div>

            <div style={{position: "absolute", top: "3070px", width: '700px', height: '400px', textAlign:"center"}}>
            The scatter plot representing Alabama shows a correlation between the percent of african
            americans in a district and the voter share of Will Boyd, the democrat representative. This tells us that
            minorities are more likely to vote for democratic party. Meanwhile, there is a slight decline in
            voter share for Katie Britt, telling us that the republican party voter share is slightly decreases when
            the percentage of african americans in a district increases.</div>

            <div style={{position: "absolute", left:"50%", top: "3070px", width: '700px', height: '400px', textAlign:"center"}}>
            The scatter plot representing Delaware shows a correlation between the percent of african
            americans in a district and the voter share of David Sokola, the democrat representative. This tells us that
            minorities are more likely to vote for democratic party. Gerald Hocker, the republican representative, does
            not have much of a trend as shown by the sporadic plotting of the points.</div>



        </div>
    );
}
export default MyComponent;