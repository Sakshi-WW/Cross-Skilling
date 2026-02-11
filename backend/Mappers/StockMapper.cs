using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Stocks;
using backend.models;
using backend.Dtos.Comments;

namespace backend.Mappers
{
    public static class StockMapper
    {
      public static StockDto ToStockDto (this Stock stockModel)
      {
        return new StockDto
        {
          Id=stockModel.Id,
          Symbol=stockModel.Symbol,
          Company=stockModel.Company,
          Purchase=stockModel.Purchase,
          LastDiv=stockModel.LastDiv,
          Industry=stockModel.Industry,
          MarketCap=stockModel.MarketCap,
          Comments=stockModel.Comments.Select(c => c.ToCommentDto()).ToList()
          
        };
      }  
      public static Stock ToStockFromCreateDto(this CreateStockRequestDto stockDto)
      {
        return new Stock
        {
          Symbol=stockDto.Symbol,
          Company=stockDto.Company,
          Purchase=stockDto.Purchase,
          LastDiv=stockDto.LastDiv,
          Industry=stockDto.Industry,
          MarketCap=stockDto.MarketCap
        };
      }

      public static Stock ToStockFromUpdateDto(this UpdateStockRequestDto updateDto, Stock stockModel)
      {
        stockModel.Symbol=updateDto.Symbol;
        stockModel.Company=updateDto.Company;
        stockModel.Purchase=updateDto.Purchase;
        stockModel.LastDiv=updateDto.LastDiv;
        stockModel.Industry=updateDto.Industry;
        stockModel.MarketCap=updateDto.MarketCap;


        return stockModel;
      }

     
    }
}