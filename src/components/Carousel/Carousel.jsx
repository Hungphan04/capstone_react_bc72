import React from 'react'

export default function Carousel() {
  return (
    <div className="md:h-[600px] h-[1000px] w-full bg-banner bg-cover bg-center bg-no-repeat relative">
      <div className="w-full h-full bg-black/40 " />
      <div className="flex flex-col md:flex-row items-center justify-between absolute md:top-1/2 top-10 -translate-x-1/2 left-1/2 md:-translate-y-1/2 w-full ">
        <div className="md:w-[50%] w-full ">
          <div className="flex flex-col space-y-6 items-start p-10">
            <p className="bg-gradient-to-r from-red-600 to-red-300 py-2 px-6">
              TV Show
            </p>
            <div className="flex flex-col space-y-4">
              <h1 className="text-[40px] font-bold text-white ">
                Bàn tay diệt quỷ
              </h1>
              <p className="text-white">
              Bàn tay diệt quỷ là một bộ phim hành động kinh dị của Hàn Quốc, được đạo diễn bởi Jason Kim Joo-hwan, ra mắt vào năm 2019. Nội dung phim xoay quanh một võ sĩ MMA, người sử dụng sức mạnh thần thánh từ một linh mục trừ tà để chiến đấu vì chính nghĩa. Phim có sự tham gia của các diễn viên như Woo Do Hwan, Park Seo Joon, Ahn Sung Ki, và Choi Woo Sik.
              </p>
            </div>

            <div className="flex items-center space-x-5">
              <button className="py-2 px-3 bg-black  text-white border border-black font-bold">
                Chi tiết
              </button>
              <button className="py-2 px-3 bg-red-600 text-white font-bold">
                Xem Phim
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-[50%] w-full flex items-center justify-center">
          <div className="w-[300px] h-[400px] relative group">
            <button className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <img src="./play-button.png" alt="play" className="w-16 h-16" />
            </button>
            <img
              src="https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png"
              alt="banner"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
