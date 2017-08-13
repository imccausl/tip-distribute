## Tip Distributor
(C) 2017 Ian McCausland. This App can be freely distributed and is open source according to the MIT license. If you like it, share it, fork it, submit a pull request, etc.

# Technology Stack
This app was built using React and Redux with the MaterialUI component library. This is my first app in React, and my first time using Redux. I learned it by reading the documentation, asking Google questions, and good old fashioned research -- I am a former academic, after all. Anyway, the point is: the code is a little messy while I tried to get a handle on interaction between components and managing state with Redux. Chalk that up to inexperience.

I built this in React for two reasons: 1) I wanted to learn React and Redux and it seemed like a perfectly reasonable project to get myself started; 2) If this app becomes useful to Starbucks partners, I feel like it would be well served by being turned into a React Native app. Learning React Native may be my next leap into the unknown. I love this stuff.

# Back Story

When I'm not busy trying to become a full-stack web developer, I'm working full time as a shift supervisor at Starbucks. I'm the guy that distributes the tips. Somebody's got to do it. Each week I print out a report that displays how many eligible-for-tips hours each person worked on the floor, then I take these huge bags of change from the safe, pour them on to a tray and start sorting. Once they are sorted, they get rolled, and I'm *finally* ready to find out just how much money in tips we made that week, total. It's not that glamourous, but that is how the sausage is made.

For a long time, I used a spreadsheet on my own computer to calculate everyone's share of the tips, but I'd been thinking about an app like this for awhile because it can be shared with other Starbucks stores, and will run easily on the store laptops (which don't have Excel, naturally), phones, which everyone has with them (and I make responsive web apps! I'm not an animal!), and tablets.

While there are certain limitations to a system like the one I described above, where we deal with physical sheets of paper, rather than JSON data or the like (oh how I wish I could get my hands on that data, which I would wager is XML and not JSON, to be honest), I designed this app to mitigate as best as I could the need to, at least initially, type in everyone's names manually: in the first place, the app will save all previous tip outs and populate any new tip out the user creates with the list of names from the last one. In my experience, it is unlikely that the list of names changes that much from week to week. You may have to add or delete one or two people, but you will never have to update the entire list.

Given the number of hours each person works for the week of the tip out and the (manually entered) total amount of money for that week, the app calculates the total hours used for that week, an hourly wage, and then calculates each person's earnings based on that hourly wage.

*As a side note, I would ideally like to see this app get automatically populated with tip out data each week, once payroll is completed and the new tip out report is generated. If anyone at Starbucks sees this and can help make this happen, get in touch. And if you want to give me a job on your development team, all the better. As a side note to the side note, I would also like to hear from people that find this app useful in other contexts (restaraunts, bars, etc.) where tips are distributed based on hours.*