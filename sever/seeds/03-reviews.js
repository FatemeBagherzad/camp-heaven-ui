/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('reviews').del();
  await knex('reviews').insert([
    {
      id: '5c8a34ed14eb5c17645c9108',
      review:
        'Gorgeous park. Exceptionally well maintained. Quiet, beautiful setting. Keith is the nicest guy and you can tell that people are very happy here. Really easy to work with & just very genuine and kind. Only briefly met his wife but she was also very lovely. Have heard horror stories about other parks and that’s just not the case here at all. It’s nothing but good people and awesome management. We just got our seasonal site this year & we’re looking forward to the years ahead, we feel very lucky to have landed on this place by accident. Called Keith one day when we found this park after a quick Google search, and he really took the time to tell me about the park, and gave us an awesome tour the next day. We were sold. He never makes you feel rushed and clearly wants his campers to be happy. It’s a good tribe here and you can’t beat the setting. Big, private sites. Tons of wildlife and greenery. A great spot to unplug, unwind and get reconnected to what’s important in life.',
      rating: 5,
      user_id: '5c8a1d5b0190b214360dc057',
      camp_id: '5c88fa8cf4afda39709c2955',
      likes: 2,
    },
    {
      id: '5c8a355b14eb5c17645c9109',
      review:
        "Needed a place to stay overnight.  Called ahead, and plenty of space available.  Owner is an EXTREMELY friendly guy!  He put us in a nice pull-thru space overnight.  Nice and clean spot in the trees with ponds and a HUGE fenced dog run.  Absolutely wonderful little park to stay a night.  Wish our plans could have accommodated a longer stay. Note: road to the park is rough with a lot of pot holes to avoid.  Owner is not responsible for the weather and rain the area has been getting, but I also would not recommend pulling a 40' camper into this area unless you are staying for an extended period of time.",
      rating: 4,
      user_id: '5c8a1dfa2f8fb814b56fa181',
      camp_id: '5c88fa8cf4afda39709c2955',
      likes: 5,
    },
    {
      id: '5c8a359914eb5c17645c910a',
      review:
        'This is by far the BEST park around! Keith and Heather are the best park owners, always so friendly and helpful. The park is immaculate, friendly atmosphere and an absolute paradise. We love it there! Would not have our trailer anywhere else Highly recommended!!',
      rating: 5,
      user_id: '5c8a1e1a2f8fb814b56fa182',
      camp_id: '5c88fa8cf4afda39709c2955',
      likes: 3,
    },
    {
      id: '5c8a35b614eb5c17645c910b',
      review:
        'Lots to do here fishing, swimming walking biking and a dog park. The owner Keith is amazing and extremely helpful. You will not be disappointed trust me!!',
      rating: 4,
      user_id: '5c8a1ec62f8fb814b56fa183',
      camp_id: '5c88fa8cf4afda39709c2955',
      likes: 7,
    },
    {
      id: '5c8a364c14eb5c17645c910c',
      review:
        'Very friendly owner. He seems to love what he does. Very well maintained campground in the woods. 5 minutes gravelroad takes you there. Very quiet at night. Will recommend and hopefully come back.',
      rating: 5,
      user_id: '5c8a1f292f8fb814b56fa184',
      camp_id: '5c88fa8cf4afda39709c2951',
      likes: 1,
    },
    {
      id: '5c8a368c14eb5c17645c910d',
      review:
        'Camped with our horses for the first time at Sandaraska Park and it was absolutely amazing! Friendly staff, great atmosphere, and perhaps the cleanest and well-maintained campground I’ve ever been to.',
      rating: 5,
      user_id: '5c8a1f4e2f8fb814b56fa185',
      camp_id: '5c88fa8cf4afda39709c2951',
      likes: 0,
    },
    {
      id: '5c8a36a014eb5c17645c910e',
      review:
        "Had a bad experience with the staff/owner.  We had 4 nights booked and had been quite ill and in the hopsital.  I called the day of arrival just to let them know I wouldn't be coming that night and wasn't sure if we would be making it up for the last few nights.  I was under the impression since I didn't actually tell them we were cancelling that if I started to feel better we could still come up and use our site for that last night or 2.  We were going to use the site the last night and found out the park had rented it to someone else, which seems shady.  Spoke with the office staff about it and emailed the owner and have had no response or resolution in 4 days.",
      user_id: '5c8a201e2f8fb814b56fa186',
      camp_id: '5c88fa8cf4afda39709c2951',
      likes: 4,
    },
    {
      id: '5c8a36b714eb5c17645c910f',
      review:
        'What a beautiful weekend.  The park is very well maintained and peaceful.  The staff are all friendly.  The weekend spots are a great size.  Will definitely be booking again.  Thank you, did not want to leave.',
      rating: 4,
      user_id: '5c8a1e1a2f8fb814b56fa182',
      camp_id: '5c88fa8cf4afda39709c2951',
      likes: 2,
    },
    {
      id: '5c8a379a14eb5c17645c9110',
      review:
        'Had a birthday party here that went really well. A great time was had by all. They do not offer party packages fyi. I had arrived early to decorate a couple of picnic tables a bit (about 9:30) and was able to enter no problem. It does not actually open until 10 am. (but that may be for the water park).Luckily, a few of the shelters were not reserved, and I was able to scoop one up for the party. It worked out well because it started absolutely pouring at one point, so we all went into the sheltered area for pizza. There were about 9 picnic tables in the shelter.There were also life guards on duty at all times (while the water park is open).',
      rating: 5,
      user_id: '5c8a211f2f8fb814b56fa188',
      camp_id: '5c88fa8cf4afda39709c295a',
      likes: 0,
    },
    {
      id: '5c8a37b114eb5c17645c9111',
      review:
        'There is a beautiful pond, a lovely river and a funny water playground that children and parents can play together. In addition, there is an outdoor swimming pool that in suitable for kids and adults.',
      rating: 4,
      user_id: '5c8a21d02f8fb814b56fa189',
      camp_id: '5c88fa8cf4afda39709c295a',
      likes: 4,
    },
    {
      id: '5c8a37cb14eb5c17645c9112',
      review:
        "Nice park. But honestly not sure why we paid per person. We also had fo pay extra for the water slides. So.why did we pay to get in? They said they didn't take credit to avoid extra fees. So we couldn't buy anything there. Bring cash or debit. The park is nice and it was pretty crowded.",
      rating: 5,
      user_id: '5c8a21f22f8fb814b56fa18a',
      camp_id: '5c88fa8cf4afda39709c295a',
      likes: 7,
    },
    {
      id: '5c8a37dd14eb5c17645c9113',
      review:
        'This is a GREAT place for the kids. The splash pad is huge and there’s lots to do. Adults can enjoy the water slides (slide #3 is the fastest 😉) there is an extra cost for them though. The mini golf looked fun. …',
      rating: 4,
      user_id: '5c8a22c62f8fb814b56fa18b',
      camp_id: '5c88fa8cf4afda39709c295a',
      likes: 0,
    },
    {
      id: '5c8a37f114eb5c17645c9114',
      review:
        'Horrible service from Sam and the owners, they almost make it not worth the stay with constant stress and harassment. We never received a “good morning” or “how is your day”. They only bring bad energy, it’s exhausting. Came for peace and leaving with a bigger headache. The managers Carol and Tom are the only saving grace for this place, super lovely people if you get the chance to introduce yourself. As long as Sam and his family are the owners my family will probably not be coming back. This place would be beautiful if run properly.',
      rating: 5,
      user_id: '5c8a23412f8fb814b56fa18c',
      camp_id: '5c88fa8cf4afda39709c2961',
      likes: 0,
    },
    {
      id: '5c8a381714eb5c17645c9115',
      review:
        'This is the first time I have camped at Trout Water Family Camping and I must say that I am extremely happy and satisfied with my stay. The owners and campers definitely treat you like family!!! Everyone at Trout Water is very friendly and helpful! I am definitely going to be getting a seasonal site here. The campground is very clean and attractive, clean washrooms, functioning pool, fresh cut grass and everything is always up to date! I have no complaints with my stay and I will definitely be telling all my friends and family about Trout Water Family Camping!',
      rating: 5,
      user_id: '5c8a23c82f8fb814b56fa18d',
      camp_id: '5c88fa8cf4afda39709c2961',
      likes: 4,
    },
    {
      id: '5c8a382d14eb5c17645c9116',
      review:
        "The manager of this place is amazing, Tom. He keeps everything nice, but the place needs a lot of investment by his owners. Excessive mold in the washrooms, Hydro shut down cuz isn't enough power, no filters, water cannot be drink.",
      rating: 5,
      user_id: '5c8a23de2f8fb814b56fa18e',
      camp_id: '5c88fa8cf4afda39709c2961',
      likes: 8,
    },
    {
      id: '5c8a384114eb5c17645c9117',
      review:
        'Great location for big gatherings, bathrooms are not finished, swimming pool is clean. They need to update their website with pricing. Sam is A great person',
      rating: 5,
      user_id: '5c8a24282f8fb814b56fa18f',
      camp_id: '5c88fa8cf4afda39709c2961',
      likes: 2,
    },
    {
      id: '5c8a385614eb5c17645c9118',
      review:
        'The owner shows a price and then charges almost double of what he offers. Hydro shut down every time you turn on A/C Roads full of mud Bad service, dirt washrooms.',
      rating: 5,
      user_id: '5c8a24402f8fb814b56fa190',
      camp_id: '5c88fa8cf4afda39709c295d',
      likes: 1,
    },
    {
      id: '5c8a387214eb5c17645c9119',
      review:
        'Great place for children with playgrounds and a newly renovated splash pad. They have many activities throughout the summer for everyone is join. Good fun and even better times with family and friends at Grangeways RV Park!',
      rating: 5,
      user_id: '5c8a245f2f8fb814b56fa191',
      camp_id: '5c88fa8cf4afda39709c295d',
      likes: 2,
    },
    {
      id: '5c8a38ac14eb5c17645c911a',
      review:
        "It was a good park except for the constant people walking through our campsite with no regard for us.  Also, don't leave anything outside of your trailer.  We did leave our grandson's lanterns out and they were quickly stolen from our campsite.  Will not recommend or return to this park.  We will stick with provincial parks from now ",
      rating: 5,
      user_id: '5c8a24822f8fb814b56fa192',
      camp_id: '5c88fa8cf4afda39709c295d',
      likes: 1,
    },
    {
      id: '5c8a38c714eb5c17645c911b',
      review:
        'Loved it so much that I went from transient to seasonal in the same weekend.',
      rating: 5,
      user_id: '5c8a24a02f8fb814b56fa193',
      camp_id: '5c88fa8cf4afda39709c295d',
      likes: 3,
    },
    {
      id: '5c8a38da14eb5c17645c911c',
      review:
        "That little gift shop has some delicious ice cream.  The shop keeper is very friendly.As far as the resort.  It's a great private beach resort.  I think it's in Stouffville.  Not many people know about this place. There are no washrooms.  No public access to the beach or park. Great restaurant by the lake view patio.",
      rating: 5,
      user_id: '5c8a1d5b0190b214360dc057',
      camp_id: '5c88fa8cf4afda39709c2966',
      likes: 0,
    },
    {
      id: '5c8a38ed14eb5c17645c911d',
      review:
        "I have been a seasonal resident in the family area for two years, and I love Cedar Beach Resort! Main features for me: close to northeast GTA (30 min drive); lots of children, amenities and events; friendly neighbours; great office and maintenance staff. Great place for children: lots of children, life guarded swimming pool, splash pad, large and small playgrounds, soccer field, beach volleyball courts, badminton court, tennis courts, basketball court, library, small private sandy beach front with free kayaks and paddleboats, park events (movie nights, corn roast, Santa visit in August, Halloween in September), many families have fires in the evening, ..., and many other things that make seasonal residency at Cedar Beach great. Neighbours are friendly and helpful. Admin has been excellent. Season is April 1 to October 31. Municipal electricity, municipal water in/water out to septic, overwintering for trailers/park models, internet through park office or arrange with ISP, pay for day pass for guests (keeps too many friends from visiting ...lol), convenient onsite garbage disposal, firewood purchase, and propane tank exchange/purchase. Laundromat, public showers/washrooms if needed. George's shop! 2 min drive to gas/beer/Tims. 10 min drive to mall. Nearby places for hiking, festivals, and fireworks. Quieter adults-only section. Too many conveniences to mention. Cedar Beach staff, the community, and Georges store  (aka the Coolest Little Ice Cream Shop) all try to make the resort a worry-free and magical place for children to spend their summer vacation. You can't put a price on friendships and memories away from devices. ",
      rating: 5,
      user_id: '5c8a1dfa2f8fb814b56fa181',
      camp_id: '5c88fa8cf4afda39709c2966',
      likes: 0,
    },
    {
      id: '5c8a390d14eb5c17645c911e',
      review:
        'This is a fantastic park with tons of amenities and is close to the city. It is also extremely busy. The golf cart and vehicle traffic on the road is non stop making it very difficult to walk anywhere. I also had concerns about my kids on the road.This is very much a family cottage retreat and worth the money.',
      rating: 5,
      user_id: '5c8a1e1a2f8fb814b56fa182',
      camp_id: '5c88fa8cf4afda39709c2966',
      likes: 3,
    },
    {
      id: '5c8a391f14eb5c17645c911f',
      review:
        'Staff are very friendly and more things are opening up. The pools are open and they have Life guards which I think is good. The Fish Bone restaurant is open and the food we had when first reopened was good. The grounds keepers do a great job too. Overall a nice community feel. 😊 …',
      rating: 5,
      user_id: '5c8a1ec62f8fb814b56fa183',
      camp_id: '5c88fa8cf4afda39709c2966',
      likes: 6,
    },
    {
      id: '5c8a395b14eb5c17645c9120',
      review:
        "First point I would like to make: The cabins are very small and cramped, even for one person staying there. They have a nice little patio outside where you can set up a table and eat meals, but you have to use the sink and bathroom area outside, as the cabins don't have those either. Apart from the cabins, the place is beautiful, peaceful, and tranquil. The people are friendly and helpful, (though often too busy to socialize with properly) there are always games on the lawn, and the lake is lovely to swim in (I came in early June 2023). The Bare Bistro has great food, even with me being vegan, and the clubhouse has a nice art-gallery feel with all its nudist pictures inside. I would like to come back to Bare Oaks, but on a weekend where there is something happening, maybe Body Fest, so that there is more to do and more opportunities to socialize.",
      rating: 5,
      user_id: '5c8a1f292f8fb814b56fa184',
      camp_id: '5c88fa8cf4afda39709c2970',
      likes: 5,
    },
    {
      id: '5c8a399014eb5c17645c9121',
      review:
        "I stayed with friends in their trailer. Beautiful park, well groomed, lots of gardens. There's a pond for swimming and they also have an outdoor pool and indoor hot tub. Very friendly staff and guests! So great to sit or lie in the sun!",
      rating: 4,
      user_id: '5c8a20d32f8fb814b56fa187',
      camp_id: '5c88fa8cf4afda39709c2970',
      likes: 2,
    },
    {
      id: '5c8a39a214eb5c17645c9122',
      review:
        'Great Amazing Naturist Park!! Staff are super friendly. Food was great and I loved the pool and hot tub! Best thing about this place is how polite and welcoming everyone is!',
      rating: 5,
      user_id: '5c8a1f4e2f8fb814b56fa185',
      camp_id: '5c88fa8cf4afda39709c2970',
      likes: 8,
    },
    {
      id: '5c8a39b614eb5c17645c9123',
      review:
        'Love the breeze on my skin when we stay at Bare Oaks.  Lots of plants and trees and a lake and streams. Fire pit for roasting marshmallows! Sundries shop and restaurant.  Great people working and visiting here! Can’t post most of my photos….',
      rating: 3,
      user_id: '5c8a21d02f8fb814b56fa189',
      camp_id: '5c88fa8cf4afda39709c2970',
      likes: 3,
    },
    {
      id: '5c8a3a7014eb5c17645c9124',
      review:
        'Greed taking over this park. Zero maintenance, overcrowding at ancient mouldy pool fit for 8 people max, no amenities as playground lacks safe structure, swings seem to always be out of order and never getting fixed anytime soon. Fees raise exponentially each summer yet everything about this place seems to be getting worse and worse so beware.',
      rating: 5,
      user_id: '5c8a20d32f8fb814b56fa187',
      camp_id: '5c88fa8cf4afda39709c2974',
      likes: 7,
    },
    {
      id: '5c8a3a8d14eb5c17645c9125',
      review:
        'Neighbors are friendly, easy to find. Not too happy about the price going up.',
      rating: 5,
      user_id: '5c8a211f2f8fb814b56fa188',
      camp_id: '5c88fa8cf4afda39709c2974',
      likes: 0,
    },
    {
      id: '5c8a3a9914eb5c17645c9126',
      review:
        'This park is everything I was looking for.  Everyone is super friendly, made me feel welcomed when I arrived.  I am a first time trailer owner n being a seasonal camper, this park has made it very easy to not want to ever leave.  😁😁 …',
      rating: 5,
      user_id: '5c8a21d02f8fb814b56fa189',
      camp_id: '5c88fa8cf4afda39709c2974',
      likes: 3,
    },
    {
      id: '5c8a3aaa14eb5c17645c9127',
      review:
        'Gorgeous little jem set right along the Credit river just minutes away from downtown Mississauga.',
      rating: 4,
      user_id: '5c8a23c82f8fb814b56fa18d',
      camp_id: '5c88fa8cf4afda39709c2974',
      likes: 1,
    },
    {
      id: '5c8a3abc14eb5c17645c9128',
      review: "I've been here eight summers now, great place",
      rating: 4,
      user_id: '5c8a21f22f8fb814b56fa18a',
      camp_id: '5c88fa8cf4afda39709c296c',
      likes: 5,
    },
    {
      id: '5c8a3acf14eb5c17645c9129',
      review:
        'Nice place. No snack bar ,showers or public washrooms.  Just outhouses.',
      rating: 5,
      user_id: '5c8a23c82f8fb814b56fa18d',
      camp_id: '5c88fa8cf4afda39709c296c',
      likes: 0,
    },
    {
      id: '5c8a3b1e14eb5c17645c912a',
      review:
        'The owners, Grant and Peter, are wonderful. They keep the resort looking absolutely beautiful. The Social Committee do an amazing job organizing fun events all summer long. The Rainbow Ridge community is welcoming, generous, and supportive. The Rainbow Ridge is a little piece of heaven.',
      rating: 5,
      user_id: '5c8a22c62f8fb814b56fa18b',
      camp_id: '5c88fa8cf4afda39709c296c',
      likes: 5,
    },
    {
      id: '5c8a3b3214eb5c17645c912b',
      review:
        "Such a happy placed filled with amazing people. Love going there whenever I can!! As an update a lot has changed at the Ridge - for the better! New Cabins on top of the hill - and a great food truck addition in case you are just not feeling like cooking! The pond, the pool, the people and the pride. I can't wait to go back again this season! It is always a place I visit at least once a summer - and it never dissapoints!As things start to come back to regular times - can confirm still amazing!",
      rating: 5,
      user_id: '5c8a23412f8fb814b56fa18c',
      camp_id: '5c88fa8cf4afda39709c296c',
      likes: 0,
    },
    {
      id: '5c8a3b4714eb5c17645c912c',
      review:
        'This is camping with a roof. Nice property. Bring ur own wood for fire. 25 bucks a bag for soft wood that burns way too fast. Cold night ...we froze in the cabin.',
      rating: 1,
      user_id: '5c8a23412f8fb814b56fa18c',
      camp_id: '5c88fa8cf4afda39709c296f',
      likes: 2,
    },
    {
      id: '5c8a3b6714eb5c17645c912e',
      review:
        'What a Beautiful park, the cleanest bathrooms and showers I’ve ever seen on a campsite! Tanya was so welcoming and even moved our sites so our two families could be next to each other. Definitely family friendly and safe. Beautifully renovated pool and also a clean laundry room. We will definitely be back, thank you! 😊',
      rating: 5,
      user_id: '5c8a23c82f8fb814b56fa18d',
      camp_id: '5c88fa8cf4afda39709c296f',
      likes: 1,
    },
    {
      id: '5c8a3b7c14eb5c17645c912f',
      review:
        'The area is beautiful but my first impression on one of the owners, she raised her voice at my kid and her friend. My kid and i don’t have a trailer at this trailer park. i never actually formally met any of the owners and when my kid first ever even heard of her or met her. My kid and her friend were screaming a song with no cuss words or anything and then a car sped by almost hitting her and her friend so she said one cuss word. The quiet time is at 11pm and this was around 8:45 pm and one of the owners raised her voice at my kid and her friend got saying one cuss word not in the property but just off of it. The lady said she could kick them off the property when they would have nowhere to go which is not very fair considering they can’t even drive anywhere. I would understand if this was a more than one time occurrence but this was the first time it’s ever happened.',
      rating: 5,
      user_id: '5c8a24402f8fb814b56fa190',
      camp_id: '5c88fa8cf4afda39709c296f',
      likes: 0,
    },
    {
      id: '5c8a3b9f14eb5c17645c9130',
      review:
        'The owners are scammers. Raised rates mid season last year by $650 with no warning and forced everyone to pay or get out. Raised fees close to 50% in 2 years. Everything out of the managers mouths was untruthful. Stay away from Harmony Resorts.',
      rating: 5,
      user_id: '5c8a24282f8fb814b56fa18f',
      camp_id: '5c88fa8cf4afda39709c296f',
      likes: 4,
    },
    {
      id: '5c8a3bc414eb5c17645c9131',
      review:
        'Conubia semper efficitur rhoncus suspendisse taciti lectus ex sapien dolor molestie fusce class.',
      rating: 5,
      user_id: '5c8a24402f8fb814b56fa190',
      camp_id: '5c88fa8cf4afda39709c296e',
      likes: 8,
    },
    {
      id: '5c8a3bdc14eb5c17645c9132',
      review:
        'Conubia pharetra pulvinar libero hac class congue curabitur mi porttitor!!',
      rating: 5,
      user_id: '5c8a24282f8fb814b56fa18f',
      camp_id: '5c88fa8cf4afda39709c296e',
      likes: 0,
    },
    {
      id: '5c8a3bf514eb5c17645c9133',
      review:
        'It was a nice place. Decent pool and my little guy had lots of friends to play with but if you want privacy this is not the ideal place. Very friendly and helpful staff. Mostly seasonal people but also friendly. The downfall was my site was in front of a seasonal tenant and the more alcohol consumed the louder it got. Until around 1am. In my case I was up with a 4 year old at 6am so needless to say I was not happy. I get having a good time but it was a bit much.',
      rating: 5,
      user_id: '5c8a245f2f8fb814b56fa191',
      camp_id: '5c88fa8cf4afda39709c296e',
      likes: 0,
    },
    {
      id: '5c8a3c2514eb5c17645c9134',
      review:
        'We stayed here in Early June, there were virtually no bugs, the park was quiet and had friendly owners and seasonal campers, they were very welcoming.  Site was large and the large trees made you feel very secluded while only 5 minutes from Shellbourne.',
      rating: 5,
      user_id: '5c8a24822f8fb814b56fa192',
      camp_id: '5c88fa8cf4afda39709c296e',
      likes: 2,
    },
    {
      id: '5c8a3c3b14eb5c17645c9135',
      review:
        'Perfect spot for those like to keep it “rough”, classic & calm. Highly recommended for bikepackers! Please don’t fall in love with the amazing Rose ;) 🦊 Woof! …',
      rating: 4,
      user_id: '5c8a23c82f8fb814b56fa18d',
      camp_id: '5c88fa8cf4afda39709c296d',
      likes: 7,
    },
    {
      id: '5c8a3c5314eb5c17645c9136',
      review:
        'Very noisy on a busy road. The toilets are not clean or not cleaned during the stay. Showers cost 1/4CaD. Extra without comfort. $75 plus tax, p.p. night!! All around no hiking or biking trail',
      rating: 5,
      user_id: '5c8a23de2f8fb814b56fa18e',
      camp_id: '5c88fa8cf4afda39709c296d',
      likes: 4,
    },
    {
      id: '5c8a3c6814eb5c17645c9137',
      review:
        'Tristique semper proin pellentesque ipsum urna habitasse venenatis tincidunt morbi nisi at',
      rating: 4,
      user_id: '5c8a24402f8fb814b56fa190',
      camp_id: '5c88fa8cf4afda39709c296d',
      likes: 1,
    },
    {
      id: '5c8a3c7814eb5c17645c9138',
      review:
        'Potenti etiam placerat mi metus ipsum curae eget nisl torquent pretium',
      rating: 4,
      user_id: '5c8a24822f8fb814b56fa192',
      camp_id: '5c88fa8cf4afda39709c296d',
      likes: 2,
    },
    {
      id: '5c8a3c9014eb5c17645c9139',
      review:
        'Molestie non montes at fermentum cubilia quis dis placerat maecenas vulputate sapien facilisis',
      rating: 5,
      user_id: '5c8a245f2f8fb814b56fa191',
      camp_id: '5c88fa8cf4afda39709c296d',
      likes: 0,
    },
    {
      id: '5c8a3ca314eb5c17645c913a',
      review:
        'Velit vulputate faucibus in nascetur praesent potenti primis pulvinar tempor',
      rating: 5,
      user_id: '5c8a24a02f8fb814b56fa193',
      camp_id: '5c88fa8cf4afda39709c296d',
      likes: 5,
    },
  ]);
}
