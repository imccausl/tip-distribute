# Tip Distributor
(C) 2017 Ian McCausland. This App can be freely distributed and is open source according to the MIT license. If you like it, share it, fork it, submit a pull request, etc. Although I use it for Starbucks, I tried to generalize it as much as I could in order to make it useful to other contexts.

# Installation
The app is not yet ready for installing to your own Firebase account for individual use, but it will be once I get the data structure solidified and built out the first-run experience. I will update this area with detailed installation instructions as soon as it is ready.

# About
## Technology Stack
This app was built using React and Redux, using a [Firebase](http://www.firebase.com) database as the backend for data persistance and authentication. To that end, I connected firebase to redux using the [react-redux-firebase](http://www.react-redux-firebase.com) library. The interface elements make use of the [MaterialUI](http://www.material-ui.com) component library. 

## Context
### Preamble
This is my first app in React, and my first time using Redux. I learned it by reading the documentation, asking Google a lot of questions, and good old fashioned research. 

I built this in React for two reasons: 1) I wanted to learn React and Redux and it seemed like a perfectly reasonable project to get myself started; 2) If this app becomes useful to in my intended context, it would be well served by being turned into a React Native app. Learning React Native may be my next leap into the unknown. I love this stuff.

### Workflow
When I'm not busy trying to become a web developer (I try to put in 40 hours a week), I'm working full time as a shift supervisor at Starbucks. I'm the guy that distributes the tips. Somebody's got to do it. Each week I print out a report that displays how many eligible-for-tips hours each person worked on the floor, then I take these huge bags of change from the safe, pour them on to a tray and start sorting. Once they are sorted, they get rolled, and I'm *finally* ready to find out just how much money in tips we made that week, total. It's not that glamourous, but that is how the sausage is made.

For a long time, I used a spreadsheet on my own computer to calculate everyone's share of the tips, but I'd been thinking about an app like this for awhile because it can be shared with other Starbucks stores, and will run easily on the store laptops (which don't have Excel, naturally), phones, which everyone has with them (and I make responsive web apps! I'm not an animal!), and tablets.

While there are certain limitations to a system like the one I described above, where we deal with physical sheets of paper, rather than JSON data or the like (oh how I wish I could get my hands on that data, which I would wager is XML and not JSON, to be honest), I designed this app to mitigate as best as I could the need to, at least initially, type in everyone's names manually: in the first place, the app will save all previous tip outs and populate any new tip out the user creates with the list of names from the last one. In my experience, it is unlikely that the list of names changes that much from week to week. You may have to add or delete one or two people, but you will never have to update the entire list.

Given the number of hours each person works for the week of the tip out and the (manually entered) total amount of money for that week, the app calculates the total hours used for that week, an hourly wage, and then calculates each person's earnings based on that hourly wage.

## Problem(s) I Am Trying To Solve
Aside from the immediate problem (let's call it the 'easy problem') of calculating the weekly tip out based on the hours each person worked the previous week, I began to think about a few, more difficult problems with the weekly tip outs:

### 1) notifying people when their tips are ready:
You don't always get a chance to see everyone who works at your store every week, and so tips sometimes end up sitting in the bottom of the safe for extended periods of time. I sought to solve this problem by sending out notifications (email or SMS) to people when their tips are ready. Once a person is added to the tip out list, if they are not already registered in the system, they are invited to do so via email. They don't need to be registered to get the email notifications, but once they register, they can log in and see a list of the tips they have yet to pick up, the ones they have picked up, and how much money they are receving. Additionally, they are presented with how much money we earned in tips that week, and what percentage they earned based on the hours they worked. On the whole, it makes the whole system more transparent.

### 2) notifying people who filled-in for someone, but work at a different store:
There are times when someone from another store substitutes for a person at their home store. Tracking these people tends to be impossible. They are known only by a uniquely idenfiable ID number that can't really be looked up in any easy way. Although they earn tips for the time they worked, it's never easy to notify them that they are ready for pick-up, or figure out when/if they will even pick them up in the first place. At the bottom of every Starbucks safe, there are unclaimed tips that sit neglected for a non-standardized amount of time.

Here, I track who the substitute/temporary worker is, how long their tips have been waiting and when they are due to expire. (The administrator can set an expiration time.)