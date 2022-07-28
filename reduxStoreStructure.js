// The redux store structure

// HOOST users:
//  Host will ONLY have their events in the store
event: [
  {id: 1, user_id: 1, venue_id: 1, description: "blah", name: "Farmer's Market Aug. 20", start_date: "2022-08-20", end_date: "2022-98-20", approved: true, booths: [
    {id: 1, name: "small", cost: 200, number: 3},
    {id: 2, name: "medium", cost: 500, number: 1},
  ]},
  {id: 2, user_id: 1, venue_id: 1, description: "blah", name: "Farmer's Market Aug. 20", start_date: "2022-08-27", end_date: "2022-98-27", approved: true, booths: [
    {id: 1, event_id: 2, type: "small", dimensions: "5x5", quantity: 3, description: "blah", cost: 200},
    {id: 2, name: "medium", cost: 500, number: 1},
  ]}
]
// Host will have ALL vendors in the store
vendors: [
  {id: 1, name: "Carol's Craft", tags: [
    {id: 1, name: "craft"},
    {id: 5, name: "foods"}
  ]},
  {id: 2, name: "Watercraft", tags: [
    {id: 1, name: "outdoors"}
  ]},
  {id: 3, name: "Bob's Burgers", tags: [
    {id: 1, name: "entertainment"},
    {id: 4, name: "music"},
    {id: 5, name: "foods"},
  ]},
]
// Booth application
booth_applications: [
  {id: 1, event_id: 1, user_id: 1, name: "Carol's Craft", table_name: "small", approval: "approved"},

]