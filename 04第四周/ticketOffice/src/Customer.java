public class Customer {
	public int cusIndex;
	private int ticket;

	Customer(int cusIndex,int ticket)
	{
		this.ticket=ticket;
		this.cusIndex = cusIndex;
	}

	public int getTicket()
	{
		return this.ticket;
	}

}
